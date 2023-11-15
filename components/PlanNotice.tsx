'use client';
import React from "react";
import Link from "next/link";
import { useSupabase } from "./supabaseProvider"
import { generateCheckoutLink } from "../services/lemonsqueezy";

export default function PlanNotice() {
  const { packageType, user } = useSupabase();

  if (packageType === "free") {
    const lemonSqueezyUrl = generateCheckoutLink(user);

    return (
      <div className="bg-blue-500 text-center text-white py-2">
        <span>
          Generate more renders and unlock all styles by{" "}
          <Link target="_blank" rel="noopener noreferrer" href={lemonSqueezyUrl} className="underline font-bold">
            upgrading your account
          </Link>
        </span>
      </div>
    )
  }

  return (<></>)
}
