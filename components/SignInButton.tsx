"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { Dropdown } from "antd";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/dist/client/components/headers";
import { useSupabase } from "../components/supabaseProvider";

function SignInButton() {
  const { supabase, user, signInWithSupabase } = useSupabase();

  async function handleSignOut() {
    try {
      const { error } = await supabase.auth.signOut();

      if (!error) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!user)
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
          onClick={signInWithSupabase}
        >
          Get Started
        </button>
      </div>
    );

  return (
    <div>
      <button className="text-red-500" onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
}

export default SignInButton;
