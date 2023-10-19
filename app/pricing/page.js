"use client";
import React from "react";
import Header from "../../components/Header";
import { useSupabase } from "../../components/supabaseProvider";
import Link from "next/link";
import Footer from "../../components/Footer";

function page() {
  const { supabase, user, signInWithSupabase } = useSupabase();
  return (
    <div className=" max-w-6xl mx-auto">
      <Header />
      <div>
        <div className="flex justify-left items-center pt-24 pb-12">
          <div className="space-y-5">
            <div>
              <span className="font-bold text-4xl">
                <span className="text-blue-500">15x</span> cheaper than what you're currently paying.
              </span>
            </div>
            <div>
              <span>
                We help you save on time and costs compared to traditional
                rendering softwares and services, to give you back more freedom
                on the things that truly matter.
              </span>
            </div>
          </div>
        </div>
        <div className="lg:flex items-center pt-12 lg:space-x-7 lg:space-y-0 space-y-10">
          <div className="shadow-xl border rounded-xl p-12 space-y-10">
            <div className="space-y-7">
              <div className="text-center">
                <span className=" font-bold px-5 py-1 rounded-full text-blue-500 text-xs">
                  Hobby
                </span>
              </div>
              <div className="">
                <div className="text-center">
                  <span className="font-bold">
                    <span className="text-4xl">Free</span>
                  </span>
                  <span className=""></span>
                </div>
              </div>
            </div>

            <div className="space-y-10 text-sm text-left">
              <div className="space-y-3 h-[400px]">
                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">
                      <span className="font-bold underline">10</span> images
                      every month
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <div>
                    <img
                      src="/img/tick-tutor.png"
                      style={{
                        minWidth: "20px",
                        minHeight: "20px",
                        width: "20px",
                      }}
                    />
                  </div>
                  <div>
                    <span className="">
                      Queued requests, occasional{" "}
                      <span className="font-bold underline">
                        downtime and timeouts
                      </span>
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">
                      <span className="font-bold underline">
                        Limited selection
                      </span>{" "}
                      of architectural styles and options
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">Interior design studio</span>
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">Access to all future updates</span>
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">Request new features</span>
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">Customer support</span>
                  </div>
                </div>

                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">Small watermark</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center font-bold">
                {user ? (
                  <Link
                    className="bg-blue-500 rounded-md w-full text-white px-4 py-3 hover:bg-black transition font-bold"
                    href={"/dream"}
                  >
                    Go to the MyArchitectAI app →
                  </Link>
                ) : (
                  <button
                    className="bg-blue-500 rounded-md w-full text-white px-4 py-3 hover:bg-black transition font-bold"
                    onClick={() => signInWithSupabase()}
                  >
                    Build your dream home →
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="shadow-xl border rounded-xl p-12 space-y-10">
            <div className="space-y-7">
              <div className="text-center">
                <span className="text-blue-500  font-bold px-5 py-1 rounded-full text-xs">
                  Premium
                </span>
              </div>
              <div className="">
                <div className="text-center">
                  <span className="font-bold  ">
                    <span className="text-4xl ">$15.99</span>
                  </span>
                  <span className="">/month</span>
                </div>
              </div>
            </div>

            <div className="space-y-10 text-left text-sm">
              <div className="space-y-3 h-[400px]">
                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">
                      <span className="font-bold underline">Unlimited</span>{" "}
                      images every month
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <div>
                    <img
                      src="/img/tick-tutor.png"
                      style={{
                        minWidth: "20px",
                        minHeight: "20px",
                        width: "20px",
                      }}
                    />
                  </div>
                  <div>
                    <span className="">
                      <span className="font-bold underline">Prioritized</span>{" "}
                      responses, no downtime and timeout
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">
                      <span className="font-bold underline">100+</span>{" "}
                      architectural styles and options
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">Interior Design Studio</span>
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">Exterior Design Studio</span>
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">Floorplan Design Studio</span>
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">Access to all future updates</span>
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">Request new features</span>
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">Customer support</span>
                  </div>
                </div>

                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">No watermark</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Link
                  href="/link-to-premium"
                  target="_blank"
                  className="w-full"
                >
                  <button className="bg-blue-500 rounded-md w-full text-white px-4 py-3 hover:bg-black transition font-bold">
                    Build your dream home →
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="shadow-xl border rounded-xl p-12 space-y-10">
            <div className="space-y-7">
              <div className="text-center">
                <span className="text-blue-500 font-bold px-5 py-1 rounded-full text-xs">
                  Premium Yearly
                </span>
              </div>
              <div className="">
                <div className="text-center">
                  <span className="font-bold  ">
                    <span className="text-4xl ">$179.99</span>
                  </span>
                  <span className="">/year</span>
                </div>
              </div>
            </div>

            <div className="space-y-10 text-left text-sm">
              <div className="space-y-3 h-[400px]">
                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">
                      <span className="font-bold underline">Unlimited</span>{" "}
                      images every month
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <div>
                    <img
                      src="/img/tick-tutor.png"
                      style={{
                        minWidth: "20px",
                        minHeight: "20px",
                        width: "20px",
                      }}
                    />
                  </div>
                  <div>
                    <span className="">
                      <span className="font-bold underline">Prioritized</span>{" "}
                      responses, no downtime and timeout
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">
                      <span className="font-bold underline">100+</span>{" "}
                      architectural styles and options
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">Interior Design Studio</span>
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">Exterior Design Studio</span>
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">Floorplan Design Studio</span>
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">Access to all future updates</span>
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">Request new features</span>
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">Customer support</span>
                  </div>
                </div>

                <div className="flex space-x-3 items-center">
                  <div>
                    <img src="/img/tick-tutor.png" height={20} width={20} />
                  </div>
                  <div>
                    <span className="">No watermark</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Link
                  href="/link-to-premium"
                  target="_blank"
                  className="w-full"
                >
                  <button
                    // onClick={() => {
                    //   Paddle.Checkout.open({
                    //     product: 47418,
                    //   });
                    // }}
                    className="bg-blue-500 rounded-md w-full text-white px-4 py-3 hover:bg-black transition font-bold"
                  >
                    Build your dream home →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default page;
