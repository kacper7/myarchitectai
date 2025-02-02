"use client";
import Link from "next/link";
import AuthHeaderOptions from "./auth/HeaderOptions";
import { useSupabase } from "./supabaseProvider";

export default function Header() {
  const { packageType, user } = useSupabase();
  return (
    <>
      <header className="lg:px-0 px-5 flex items-center w-full mt-5 pb-7  justify-between ">
        <div className="flex space-x-12 items-center">
          <Link href="/" className="flex space-x-2">
            <h1 className="text-xl font-bold ml-2 tracking-tight">
               MyArchitectAI{" "}
              {/* <span className="text-xs text-stone-500">Beta</span> */}
            </h1>
          </Link>
          {user ? (
            <div className="space-x-5 flex items-center">
              <div>
                <Link href={"/interior"}>
                  <span className="font-bold text-stone-600">
                    Interior Studio
                  </span>
                </Link>
              </div>
              <div>
                <Link href={"/exterior"}>
                  <span className="font-bold text-stone-600">
                    Exterior Studio
                  </span>
                </Link>
              </div>
              <div>
                <Link href={"/floorplan"}>
                  <span className="font-bold text-stone-600">
                    Floorplan Studio
                  </span>
                </Link>
              </div>
              <div>
                <Link href={"/dream-home"}>
                  <span className="font-bold text-stone-600">
                    Dream Home Generator
                  </span>
                </Link>
              </div>
            </div>
          ) : null}

          <div className="flex items-center space-x-5"></div>
        </div>{" "}
        <AuthHeaderOptions />
      </header>
    </>
  );
}

function Github({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
