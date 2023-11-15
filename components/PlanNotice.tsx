'use client';
import React from "react";
import Link from "next/link";
import { useSupabase } from "./supabaseProvider"
import { LEMON_SQUEEZY_URL, LEMON_SQUEEZY_URL_PARAMS } from "../utils/constants";

export default function PlanNotice() {
  const { packageType, user } = useSupabase();

  if (packageType === "free") {
    let lemonSqueezyUrl = `${LEMON_SQUEEZY_URL}?${LEMON_SQUEEZY_URL_PARAMS.toString()}`
    if (user) {
      const params = LEMON_SQUEEZY_URL_PARAMS;
      params.set("checkout[email]", user.email || "")
      params.set("checkout[custom][user_id]", user.id)
      lemonSqueezyUrl = `${LEMON_SQUEEZY_URL}?${params.toString()}`
    }

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
