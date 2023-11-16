"use client";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";
import QnA from "../components/QnA";
import { useSupabase } from "../components/supabaseProvider";
import { CompareSlider } from "../components/CompareSlider";
import { REQUEST_SIGN_IN_MODAL } from "../utils/events";

export default function HomePage() {
  const { user } = useSupabase();

  function requestSignInModal() {
    PubSub.publish(REQUEST_SIGN_IN_MODAL, {});
  }

  return (
    <>
      <div className="background "></div>
      <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen z-10">
        <Header />
        <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20">
          <div className="lg:flex justify-between items-center w-full lg:space-x-24">
            <div className="lg:w-1/2 lg:text-left space-y-7">
              <div>
                <span className="font-bold lg:text-5xl text-3xl text-stone-800">
                  {/* Visualize your architectural ideas in seconds. */}
                  Photorealistic renders in seconds, not hours.{" "}
                  {/* <span className="text-blue-500 ">seconds.</span> */}
                </span>
              </div>
              <div>
                <span className="text-xl">
                  {" "}
                  Say goodbye to time-consuming manual rendering and embrace a
                  new era of efficiency.{" "}
                </span>
              </div>

              <div className="space-y-2 text-stone-600 lg:text-sm sm:text-xs text-left">
                <div className="flex space-x-3 items-center">
                  <div>
                    <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
                  </div>
                  <div>
                    <span className="">
                      {" "}
                      <span className="font-bold underline">15x</span> more
                      affordable than existing solutions
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <div>
                    <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
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
                    <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
                  </div>
                  <div>
                    <span className="">
                      {" "}
                      Built for architects, interior designers, real estate
                      agents
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3 items-center ">
                  <div>
                    <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
                  </div>
                  <div>
                    <span className="">
                      {" "}
                      Iterate through designs faster, present clients with
                      stunning renders in seconds
                    </span>
                  </div>
                </div>
              </div>

              <div>
                {user ? (
                  <Link
                    className="bg-black font-bold rounded-md text-white px-10 py-3 hover:bg-blue-500 transition"
                    href={"/dream"}
                  >
                    Go to the MyArchitectAI app →
                  </Link>
                ) : (
                  <button
                    className="bg-black font-bold rounded-md text-white px-10 py-3 hover:bg-blue-500 transition"
                    onClick={() => requestSignInModal()}
                  >
                    Build your dream home →
                  </button>
                )}
              </div>

              <div className="flex space-x-3 w-full items-center lg:justify-start justify-center">
                <div>
                  <img src="/img/star.png" width={70} alt="star" />
                </div>

                <div>
                  <span className="text-sm">Join 100+ architecture lovers</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 lg:pt-0 pt-10">
              {/* <img src="/img/hero.webp" /> */}
              <CompareSlider
                original="/img/exterior-before.png"
                restored="/img/exterior-after.png"
              />
            </div>
          </div>

          <div className="flex justify-center items-center pt-48">
            <div className="space-y-7">
              <div>
                <span className="font-bold text-2xl text-stone-700">
                  Featured & trusted by
                </span>
              </div>
              {/* <div>
              <span>
                Our platform goes beyond mere visualization, breathing life into
                your designs and eliciting powerful emotions. Present your
                photorealistic visuals to clients and stakeholders, and watch as
                they become fully immersed in your vision.
              </span>
            </div> */}
              <div className=" lg:flex lg:space-x-10 justify-center lg:space-y-0 space-y-7">
                <div style={{ width: 200 }}>
                  <img src="/img/saashub.webp" className="" alt="saashub" />
                </div>
                <div style={{ width: 200 }}>
                  <img src="/img/whattheai.PNG" className="" alt="whattheai" />
                </div>
                <div style={{ width: 200 }}>
                  <img src="/img/saasaitools.PNG" className="rounded-md" alt="saasaitools" />
                </div>
                <div style={{ width: 200 }}>
                  <img src="/img/saasbaba.png" className="rounded-md" alt="saasbaba" />
                </div>
              </div>
            </div>
          </div>

          {/* <div className="flex justify-center items-center pt-48">
            <div className="space-y-5">
              <div>
                <span className="font-bold text-4xl">
                  <span className="text-black">10x</span> your architecture
                  design output
                </span>
              </div>
              <div>
                <span>
                  Our platform goes beyond mere visualization, breathing life
                  into your designs and eliciting powerful emotions. Present
                  your photorealistic visuals to clients and stakeholders, and
                  watch as they become fully immersed in your vision.
                </span>
              </div>
              <div className="pt-12">
                <img src="/img/mid.png" />
              </div>
              <div className="pt-12">
                <Link
                  className="bg-black rounded-xl text-white font-medium px-4 py-3 lg:mt-0 sm:mt-10  hover:bg-black transition"
                  href={"/dream"}
                >
                  Build your dream home for free →
                </Link>
              </div>
            </div>
          </div> */}

          <div className="pt-48 space-y-5">
            <div className="flex justify-center">
              <div className="font-bold text-4xl">How it works</div>
            </div>
            <div className="flex justify-center">
              <div className=" text-stone-700">
                Visualize your ideas photorealistically in seconds. (It&apos;s easy
                as one two three)
              </div>
            </div>

            <div className="lg:grid grid-cols-3 gap-5 text-stone-700">
              <div className="p-5 rounded-md text-left">
                <div className="space-y-5">
                  <div className="">
                    <img
                      className="border rounded-md shadow-md h-48 w-full object-cover"
                      src="/img/interior-before.png"
                      alt="interior-before"
                    />
                  </div>
                  <div>
                    <span className="text-2xl font-bold">
                      Upload your designs
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-600">
                      Upload your idea to the web editor and watch the magic
                      happen. Whether it&apos;s a rough sketch, a 3d render, or a
                      photo of a real property, MyArchitectAI will revisualize
                      it into beautiful photorealistic renders in a matter of
                      seconds.{" "}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-md text-left">
                <div className="space-y-5">
                  <div>
                    <img
                      className="border rounded-md shadow-md h-48 w-full object-cover"
                      src="/img/options.PNG"
                      alt="options"
                    />
                  </div>
                  <div>
                    <span className="text-2xl font-bold">
                      Customize the options
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-600">
                      With over 100+ architectural styles, made to fulfill every
                      need, freely pick the styles and lighting options that
                      best match your designs and watch your imagination fly.
                      Whether it&apos;s the interior,exterior or even floorplans,
                      we&apos;ve got you covered from top to toe.
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-md text-left ">
                <div className="space-y-5">
                  <div>
                    <img
                      className="border rounded-md shadow-md h-48 w-full object-cover"
                      src="/img/interior-after.png"
                      alt="interior-after"
                    />
                  </div>
                  <div>
                    <span className="text-2xl font-bold">Download & share</span>
                  </div>
                  <div>
                    <span className="text-stone-600">
                      After a few seconds, your photorealistic renders will be
                      ready to be downloaded. This allows you to decrease the
                      time it takes to go through iterations with your clients,
                      optimizing your workflow and saving you both time and
                      money in the long run.{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:flex justify-between items-center w-full lg:space-x-24 pt-48">
            <div className="lg:w-1/2 lg:pt-0 pt-10">
              <img src="/img/architecture-styles.png" />
              {/* <CompareSlider original="/img/exterior-before.png" restored="/img/exterior-after.png" /> */}
            </div>
            <div className="lg:w-1/2 lg:text-left space-y-7">
              <div>
                <span className="font-bold lg:text-4xl text-3xl">
                  Pick from <span className="text-black">hundreds</span> of
                  styles to fit your preferences
                </span>
              </div>
              <div>
                <span className="">
                  From the timeless elegance of Neoclassical to the sleek lines
                  of Modernist, our curated selection offers hundreds of
                  architectural styles for you to choose from.
                </span>
              </div>
              <div>
                {user ? (
                  <Link
                    className="bg-black font-bold rounded-md text-white px-10 py-3 hover:bg-blue-500 transition"
                    href={"/dream"}
                  >
                    Go to the MyArchitectAI app →
                  </Link>
                ) : (
                  <button
                    className="bg-black font-bold rounded-md text-white px-10 py-3 hover:bg-blue-500 transition"
                    onClick={() => requestSignInModal()}
                  >
                    Build your dream home →
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="lg:flex justify-between items-center w-full lg:space-x-24 pt-48">
            <div className="lg:w-1/2 lg:text-left space-y-7">
              <div>
                <span className="font-bold lg:text-4xl text-3xl">
                  Floorplans, Interior, Exterior design made easy
                </span>
              </div>
              <div>
                <span className="">
                  We&apos;ve revolutionized the way you approach architecture and
                  decor, making it accessible to everyone, regardless of
                  expertise.
                </span>
              </div>
              <div>
                {user ? (
                  <Link
                    className="bg-black font-bold rounded-md text-white px-10 py-3 hover:bg-blue-500 transition"
                    href={"/dream"}
                  >
                    Go to the MyArchitectAI app →
                  </Link>
                ) : (
                  <button
                    className="bg-black font-bold rounded-md text-white px-10 py-3 hover:bg-blue-500 transition"
                    onClick={() => requestSignInModal()}
                  >
                    Build your dream home →
                  </button>
                )}
              </div>
            </div>
            <div className="lg:w-1/2 lg:pt-0 pt-10">
              <img src="/img/all.png" />
              {/* <CompareSlider original="/img/exterior-before.png" restored="/img/exterior-after.png" /> */}
            </div>
          </div>
          {/* 
          <div className="lg:flex justify-between items-center w-full lg:space-x-24 pt-48">
            <div className=" lg:text-left space-y-7 p-10 border rounded-md">
              <div>
                <span className="font-bold lg:text-4xl text-3xl">
                  Don't want to spend time rendering? We can do it for you.
                </span>
              </div>
              <div>
                <span className="">
                  Our team is dedicated to providing high-quality rendering
                  services for projects that involve a high quantity of images,
                  tailored to meet your specific requirements and preferences.
                  We offer each render at a competitive rate of $1 per image. If
                  your business demands exceptional visualizations and
                  personalized attention, we encourage you to get in touch with
                  us. Our experts are eager to learn more about your unique
                  needs and how we can best assist you.
                </span>
              </div>
              <div>
                <span className="underline">
                  Send us an email at kiettran255@gmail.com
                </span>
              </div>
            </div>
          </div> */}

          <div className="flex justify-center items-center pt-48 w-full">
            <div className="space-y-5">
              <div>
                <span className="font-bold text-4xl">
                  One platform for every need
                </span>
              </div>
              <div>
                <span>
                  MyArchitectureAI is a versatile platform that benefits
                  architects, interior designers, real estate agents, and home
                  lovers alike.
                </span>
              </div>
              <div className="w-full pt-10">
                <div className="lg:grid grid-cols-2 gap-10">
                  <div className="rounded-xl space-y-3">
                    <div className="">
                      <Image
                        className="h-48 bg-black cover rounded-xl w-full object-cover"
                        src={"/img/architects.jpg"}
                        height={300}
                        width={400}
                        alt="architects"
                      />
                    </div>
                    <div className="rounded-b-xl">
                      <div className="py-3 space-y-2">
                        <div>
                          <span className="text-sm"></span>
                        </div>
                        <div className="flex space-x-3 items-center">
                          <span className="font-bold text-2xl line-clamp-2 hover:underline">
                            Architects
                          </span>
                        </div>
                        <div className="flex space-x-3 items-center">
                          <span className="  line-clamp-5 text-left">
                            MyArchitectureAI enables architects to visualize
                            sketches in various styles, fostering quick
                            iteration and experimentation. The platform
                            automates remodeling, saving architects significant
                            time while effortlessly generating multiple design
                            options.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="rounded-xl space-y-3 ">
                    <div className="">
                      <Image
                        className="h-48 bg-black cover rounded-xl w-full object-cover"
                        src={"/img/interior-designers.jpg"}
                        height={300}
                        width={400}
                        alt="interior-designers"
                      />
                    </div>
                    <div className="rounded-b-xl">
                      <div className="py-3 space-y-2">
                        <div>
                          <span className="text-sm"></span>
                        </div>
                        <div className="flex space-x-3 items-center">
                          <span className="font-bold text-2xl line-clamp-2 hover:underline">
                            Interior Designers
                          </span>
                        </div>
                        <div className="flex space-x-3 items-center">
                          <span className="  line-clamp-5 text-left">
                            By uploading images, designers can quickly explore
                            different styles, facilitating creative exploration
                            for unique and personalized designs. AI-generated
                            visuals enable designers to present multiple options
                            to clients, aiding their decision-making process.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="rounded-xl space-y-3 ">
                    <div className="">
                      <Image
                        className="h-48 bg-black cover rounded-xl w-full object-cover"
                        src={"/img/real-estate-agents.jpg"}
                        height={300}
                        width={400}
                        alt="real-estate-agents"
                      />
                    </div>
                    <div className="rounded-b-xl">
                      <div className="py-3 space-y-2">
                        <div>
                          <span className="text-sm"></span>
                        </div>
                        <div className="flex space-x-3 items-center">
                          <span className="font-bold text-2xl line-clamp-2 hover:underline">
                            Real Estate Agents
                          </span>
                        </div>
                        <div className="flex space-x-3 items-center">
                          <span className="  line-clamp-5 text-left">
                            MyArchitectureAI revitalizes property listings by
                            remodeling scenes in various styles, attracting
                            buyers with diverse preferences. Visually appealing
                            design options accelerate the sales process,
                            allowing agents to present properties effectively
                            and reduce physical visits.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="rounded-xl space-y-3 ">
                    <div className="">
                      <Image
                        className="h-48 bg-black cover rounded-xl w-full object-cover"
                        src={"/img/home-lovers.jpg"}
                        height={300}
                        width={400}
                        alt="home-lovers"
                      />
                    </div>
                    <div className="rounded-b-xl">
                      <div className="py-3 space-y-2">
                        <div>
                          <span className="text-sm"></span>
                        </div>
                        <div className="flex space-x-3 items-center">
                          <span className="font-bold text-2xl line-clamp-2 hover:underline">
                            Home Lovers
                          </span>
                        </div>
                        <div className="flex space-x-3 items-center">
                          <span className="  line-clamp-5 text-left">
                            MyArchitectureAI sparks inspiration by showcasing
                            different styles, helping users discover new design
                            directions for their spaces. Users can visualize
                            their spaces in various styles, creating a unique
                            living environment that reflects their preferences.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12">
            <Link
              className="bg-black rounded-xl text-white font-medium px-4 py-3 lg:mt-0 sm:mt-10  hover:bg-black transition"
              href={"/dream"}
            >
              Build your dream home for free →
            </Link>
          </div>

          <div className="flex justify-center items-center pt-48">
            <div className="space-y-5">
              <div>
                <span className="font-bold text-4xl">
                  15x cheaper than what you&apos;re currently paying.
                </span>
              </div>
              <div>
                <span>
                  We help you save on time and costs compared to traditional
                  rendering softwares and services, to give you back more
                  freedom on the things that truly matter.
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
                      <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
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
                      <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
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
                      <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
                    </div>
                    <div>
                      <span className="">Interior design studio</span>
                    </div>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <div>
                      <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
                    </div>
                    <div>
                      <span className="">Access to all future updates</span>
                    </div>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <div>
                      <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
                    </div>
                    <div>
                      <span className="">Request new features</span>
                    </div>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <div>
                      <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
                    </div>
                    <div>
                      <span className="">Customer support</span>
                    </div>
                  </div>

                  <div className="flex space-x-3 items-center">
                    <div>
                      <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
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
                      onClick={() => requestSignInModal()}
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
                      <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
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
                      <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
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
                      <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
                    </div>
                    <div>
                      <span className="">Interior Design Studio</span>
                    </div>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <div>
                      <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
                    </div>
                    <div>
                      <span className="">Exterior Design Studio</span>
                    </div>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <div>
                      <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
                    </div>
                    <div>
                      <span className="">Floorplan Design Studio</span>
                    </div>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <div>
                      <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
                    </div>
                    <div>
                      <span className="">Access to all future updates</span>
                    </div>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <div>
                      <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
                    </div>
                    <div>
                      <span className="">Request new features</span>
                    </div>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <div>
                      <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
                    </div>
                    <div>
                      <span className="">Customer support</span>
                    </div>
                  </div>

                  <div className="flex space-x-3 items-center">
                    <div>
                      <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
                    </div>
                    <div>
                      <span className="">No watermark</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Link
                    href="/link-to-premium-subscription"
                    target="_blank"
                    className="w-full"
                  >
                    <button
                      className="bg-blue-500 rounded-md w-full text-white px-4 py-3 hover:bg-black transition font-bold"
                    >
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
                      <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
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
                      <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
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
                      <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
                    </div>
                    <div>
                      <span className="">Interior Design Studio</span>
                    </div>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <div>
                      <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
                    </div>
                    <div>
                      <span className="">Exterior Design Studio</span>
                    </div>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <div>
                      <Image src="/img/tick-tutor.png" height={20} width={20}  alt="tick-tutor" />
                    </div>
                    <div>
                      <span className="">Floorplan Design Studio</span>
                    </div>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <div>
                      <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
                    </div>
                    <div>
                      <span className="">Access to all future updates</span>
                    </div>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <div>
                      <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
                    </div>
                    <div>
                      <span className="">Request new features</span>
                    </div>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <div>
                      <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
                    </div>
                    <div>
                      <span className="">Customer support</span>
                    </div>
                  </div>

                  <div className="flex space-x-3 items-center">
                    <div>
                      <Image src="/img/tick-tutor.png" height={20} width={20} alt="tick-tutor" />
                    </div>
                    <div>
                      <span className="">No watermark</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Link
                    href="/link-to-premium-yearly-subscription"
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

          <div className="pt-12">
            <span>
              Cancel at any time, 100% refunds, no questions asked.{" "}
              <Link
                className="underline"
                target="_blank"
                href={"/link-to-support-here"}
              >
                Message us
              </Link>{" "}
              {/* for custom requirements. <br></br>Don't want to do the rendering
              yourself? We can do it for you as well.{" "} */}
            </span>
          </div>

          <div className="flex justify-center items-center pt-48">
            <div className="space-y-5">
              <div>
                <span className="font-bold text-3xl">
                  Explore what others have built
                </span>
              </div>
              <div>
                <span>
                  Find inspiration from buildings built by creative architects
                  and home lovers all across the globe using MyArchitectAI.
                </span>
              </div>
              <div>
                <img src="/img/others.webp" />
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Link
              className="bg-black rounded-xl text-white font-medium px-4 py-3 hover:bg-black transition"
              href={"/dream"}
            >
              Build your dream home for free →
            </Link>
          </div>

          <div className="lg:flex justify-between py-24 w-full lg:space-x-12 pt-48">
            <div className="lg:w-1/2 space-y-5">
              <div className="text-left">
                <span className="text-3xl font-bold">
                  Frequently asked questions
                </span>
              </div>
              <div className="text-left">
                <span>
                  Answers to common questions about MyArchitectureAI&apos;s services
                  for architects, interior desginers, real estate agents and
                  home lovers.
                </span>
              </div>
            </div>
            <QnA />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
