'use client';
import React from "react";
import Link from "next/link";
import PubSub from "pubsub-js";
import { useSupabase } from "../supabaseProvider";
import AuthSignInModal from "./SignInModal";
import { REQUEST_SIGN_IN_MODAL } from "../../utils/events";

export default function AuthHeaderOptions() {
  const { supabase, user } = useSupabase();

  function requestSignInModal() {
    PubSub.publish(REQUEST_SIGN_IN_MODAL, {});
  }

  async function handleSignOut(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();

      if (!error) {
        window.location.reload();
      }
    } catch (error) {
      // TODO: Handle error
      console.log(error);
    }
  }

  if (!user) {
    return (
      <div className="space-x-10 flex items-center">
        <div>
          <Link className="" href={"/pricing"}>
            Pricing
          </Link>
        </div>
        <div>
          <Link className="underline" href={"/affiliate-link-here"} target="_blank">
            Join us as an affiliate
          </Link>
        </div>
        <button
          className="text-white font-bold bg-black px-5 py-2 rounded-md hover:bg-blue-500"
          onClick={requestSignInModal}
        >
          Get Started
        </button>

        <AuthSignInModal />
      </div>
    )
  }

  return (
    <div>
      <button className="text-red-500" onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  )
}
