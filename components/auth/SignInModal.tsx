'use client'
import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import PubSub from "pubsub-js";
import { REQUEST_SIGN_IN_MODAL } from "../../utils/events";
import { useSupabase } from "../supabaseProvider";

export default function AuthSignInModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [notices, setNotices] = useState<string[]>([]);
  const [isSignUp, setIsSignUp] = useState(false);
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useSupabase();

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setErrors([]);
    setNotices([]);
  }

  const showModal = () => {
    setIsModalOpen(true);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setNotices([]);
    setIsLoading(true);
    if (isSignUp) {
      await signUpWithEmail(email, password).then((errors) => {
        setErrors(errors);
        if (errors.length === 0) {
          setNotices(["Your account has been created! Please check your email for a confirmation link."]);
        }
      })
    } else {
      await signInWithEmail(email, password).then((errors) => {
        setErrors(errors);
      })
    }
    setIsLoading(false);
  }

  useEffect(() => {
    const token = PubSub.subscribe(REQUEST_SIGN_IN_MODAL, showModal);

    return () => {
      PubSub.unsubscribe(token);
    }
  }, [])

  return (
    <Modal open={isModalOpen} onCancel={handleCancel} footer={[]}>
      <div className="w-full px-4 pt-8 flex flex-col gap-4">
        <button
          className="font-bold border border-black px-5 py-2 rounded-md hover:border-blue-500 hover:text-blue-500"
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </button>

        <p className="w-full text-center text-lg">
          or
        </p>

        <form className="w-full flex flex-col" onSubmit={handleFormSubmit}>
          {
            errors.length > 0 && (
              <div className="flex flex-col gap-2">
                { errors.map((error, index) => (
                  <p key={index} className="text-center text-red-500">{error}</p>
                ))}
              </div>
            )
          }
          {
            notices.length > 0 && (
              <div className="flex flex-col gap-2">
                { notices.map((error, index) => (
                  <p key={index} className="text-center text-green-500">{error}</p>
                ))}
              </div>
            )
          }
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email
          </label>
          <div className="mt-2">
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
          <div className="mt-2">
            <input
              type="password"
              name="password"
              id="password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={isLoading} className="mt-4 text-white font-bold bg-black px-5 py-2 rounded-md hover:bg-blue-500">
            { isLoading
              ? (isSignUp ? "Signing Up..." : "Signing In...")
              : (isSignUp ? "Sign Up" : "Sign In")
            }
          </button>
        </form>
        { !isSignUp && (
          <p className="w-full text-center">
            Don't have an account?
            <button className="ml-1 underline" onClick={toggleSignUp}>Sign Up</button>
          </p>
        )}
        { isSignUp && (
          <p className="w-full text-center">
            Already have an account?
            <button className="ml-1 underline" onClick={toggleSignUp}>Sign In</button>
          </p>
        )}
      </div>
    </Modal>
  )
}
