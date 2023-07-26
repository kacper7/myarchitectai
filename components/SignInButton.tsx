"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { Dropdown } from "antd";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/dist/client/components/headers";
import { useSupabase } from '../components/supabaseProvider';

function SignInButton() {
  const { supabase, user, signInWithSupabase } = useSupabase();


  if(!user)
  return (
    <div className="space-x-5">
      <button
        className="text-white font-bold bg-black px-5 py-2 rounded-md"
        onClick={signInWithSupabase}
      >
        Get Started
      </button>
    </div>
  );

  return (
    <div></div>
  )
}

export default SignInButton;
