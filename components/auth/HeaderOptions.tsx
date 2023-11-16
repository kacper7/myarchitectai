'use client';
import React from "react";
import Link from "next/link";
import PubSub from "pubsub-js";
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useSupabase } from "../supabaseProvider";
import AuthSignInModal from "./SignInModal";
import { REQUEST_SIGN_IN_MODAL } from "../../utils/events";
import { MAX_FREE_RENDERS, MAX_STARTER_RENDERS } from "../../utils/constants";


export default function AuthHeaderOptions() {
  const { supabase, user, userDetails, packageType } = useSupabase();

  function requestSignInModal() {
    PubSub.publish(REQUEST_SIGN_IN_MODAL, {});
  }

  async function handleSignOut(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();

      if (!error) {
        window.location.href = "/";
      }
    } catch (error) {
      // TODO: Handle error
      console.log(error);
    }
  }

  const items: MenuProps['items'] = [
    {
      key: '2',
      label: (
        <button className="text-base" onClick={handleSignOut}>
          Log out
        </button>
      )
    }
  ];

  if (userDetails?.lemon_squeezy_id) {
    items.unshift(
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" className="text-base" href="/lemon-squeezy-portal">
            Manage subscription
          </a>
        ),
      },
    )
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
    <div className="flex flex-row items-center gap-2">
      <div className="text-stone-600">
        <div className="font-bold">
          <span className="capitalize">{packageType}</span> plan
        </div>
        <p>
          { packageType === "pro" && (
            <span>Unlimited renders</span>
          )}
          { packageType === "starter" && (
            <span>{userDetails?.number_of_renders}/{MAX_STARTER_RENDERS} renders left</span>
          )}
          { packageType === "free" && (
            <span>{userDetails?.number_of_renders}/{MAX_FREE_RENDERS} renders left</span>
          )}
        </p>
      </div>

      <Dropdown menu={{ items }}>
        <a className="cursor-pointer" onClick={(e) => e.preventDefault()}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect width="60" height="60" rx="30" fill="url(#pattern0)"/>
            <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlinkHref="#image0_5_67" transform="scale(0.0111111)"/>
            </pattern>
            <image id="image0_5_67" width="90" height="90" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFXUlEQVR4nO2dbYiVRRTHf+nqrtqLGkFiQbWF9PalshdWKcwKosDeazOzNoMwsBLra0TSJgSxoGIgQcFSEGpGVCoVtYXZi61F9MXFD6nZuruZaSttToychbrs3vs8z50zz8w6Pziw3Hufy/+cvfeZM2fOzIVEIpFIJBKJRCKRSGRmPDAbaANWAZuAXcBuoB84JtYvj+2S17ws11wl75EYgXOAp4D3gEOAqdN+BzYDy4CZnORMAh4CtgL/OAjuaDYEbAEWAk2cRJwqn7S9isEdzX4DngfOYAwzAVgB9JUQ4EqzGpaLpjHFXOCHAAJcaT8D8xkD2HviauB4AEEdzay2DqCRSDkP2B5AIE1G+xa4kMiY7yhNM57NpoXziIQ7gL8CCJopaHYydB+B87hyTmw8mfVhCYGyQCYHZQfJOAz2vQSGva8NBhAco3AbuZlAuCjSgc/kGCCbyw5yo6RFZozbN2Xn2as9ONkNvCCzywuAKcBk4FLgOWCfp2DbSU0pXK884+sB7sygYzrwhYdAW1/n4BlbjPlR0antwNQceqZLLUU767GLDA14ZIWiMz8BpxfUZf85K5W/aU/jidMUS51DwHUONC5VDHSv1NTVeVbRiXcc6vxEUaetZasvP/2q6MAtDrXepqhzn/ay2CJF8UccDzQTgcOKeltRZKui8C4FvZ8p6v0QxZYAzcrcegXN6xX12oF7hoLmE30XRtFeUdC8SlnzkwqaTzS3aIp+UUHzSmXNG10LbpAqlqboda5FA68pa+533X42W1mwAb7EPV0edF/pUnCbpyL7NIeap3pajHgkpkHFiN3oeCXeh+Z2h5p514Pgz4nz1uF0QOz2IHgd8Q2G1na6FLzHg+BtuOdjD7rtAoUzDnoQfDhnsT/LYsCfHnTbsqkzjnkQbIBOR8G22ctbnjTbzCa6QBvgdQd63/CodzC2W4cR219nudRee8Cj3t7YBkPzH6un7+0Jz1p7YkvvTMUKhh3M8nKmfCN8anWa3m3yLN5ItTBPwca+9v0SdG6IcQpuKmxNDo1rS9LYHltRyYxgdiU7hFXvarY4tjKpiTTQV7gMtL3/DaRAUxnkAY1955tL+LR05tDXGftAOMwyz04cAS7Loe9yucanRtt65pyZHveo9BRskZ0r1/rQ+DdwNkpsURR+VL6Kd0uXUVHstXfJex1V1PsBiix0LPag5Mq3Sl+faybLe69VqNeotoRNcjTF7ZLtcvV8cvMyUTabulje2uvj7I96mtD7gPspn9Y6e7yfCbkRfQ8wi3CYVbAq2SsblrywPKe4Q8DFhMclwB85fbFprtfNQnkOOmkjXB7L4cf3vjcLDeesWTblfAeMI1zGSU25lh/W15ayRHZkEPgw4bM4gx+vlimwUbbvVhN4NeFzTQ0fdnhORUekuUZLbx9wLeHSIu231Sp05xMIN9Q4dWZQBp0QD3Kp1kphn7uJwLgnwx6XNwsuurrmLODtGlqHpGYSJEsyBHu/FI7K4BTgATnRsVaQQ/wG/o8FGQ+v+gq43aMu2y/9dQZdgyEe8VPt6J+se14+ldpDk1L1bpFs28iiZUDGm6hozpD6mQon18g5IBPqTDnnSW90niOIdoSUXRRxuqPAsQ62hfcj4CW5p7bIhtJpMgVukL/Pleda5aDubQVadY/LZKT0PNkFc0poK8ti3WVOq7VokENFegMIcK9U4bwXiHwyRZz8pYQAH5CDuouecBMlTcCDckqA5ur6kCykamU2UTFDNrBvrFF3yGr98l5LNVsCYme89LM9Kp2aG6RevFsKVMM/D9Inj+2U17TLLlZ7bfp5kEQikUgkEolEIpEgI/8CxcCKkWw2eU4AAAAASUVORK5CYII="/>
            </defs>
          </svg>
        </a>
      </Dropdown>
    </div>
  )
}
