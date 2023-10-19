import Link from "next/link";
import { useState, useEffect } from "react";
import { useSupabase } from "./supabaseProvider";

export default function Footer() {
  const { user, supabase } = useSupabase();

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
  return (
    <div className="w-full border-t py-10 space-y-10 lg:px-0 px-5">
      <div className="space-y-2 ">
        <div className="underline">
          <Link href="/contact-link-here" target="_blank">
            <span>Contact us</span>
          </Link>
        </div>{" "}
        {/* <div className="hover:underline">
          <Link href="/" target="_blank">
            <span>Terms & Conditions</span>
          </Link>
        </div> */}
      </div>
      <footer className="lg:flex w-full items-center justify-between lg:space-y-0 space-y-5">
        <div className="text-left">
          <div>
            <span className="text-sm">
              © 2023 MyArchitectAI | All Rights Reserved
            </span>
          </div>
        </div>
        {user ? (
          <div>
            <button
              className="text-white bg-red-500 px-5 py-2 rounded-md font-bold"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
        ) : null}

        <div>
          <Link
            className="bg-blue-500 px-5 py-2 rounded-md text-white underline"
            target="_blank"
            href={"/twitter-link-here"}
          >
            Contact us on Twitter
          </Link>
        </div>
      </footer>
    </div>
  );
}
