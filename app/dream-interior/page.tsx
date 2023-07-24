"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, ChangeEvent, useEffect, useCallback } from "react";
import { UploadDropzone } from "react-uploader";
import { Uploader } from "uploader";
import { CompareSlider } from "../../components/CompareSlider";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LoadingDots from "../../components/LoadingDots";
import ResizablePanel from "../../components/ResizablePanel";
import Toggle from "../../components/Toggle";
import appendNewToName from "../../utils/appendNewToName";
import downloadPhoto from "../../utils/downloadPhoto";
import DropDown from "../../components/DropDown";
import { useDropzone } from "react-dropzone";
import DropDownRestricted from "../../components/DropDownRestricted";
import Link from "next/link";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/dist/client/components/headers";

import { Image } from "antd";
import ImageUploading from "react-images-uploading";
import {
  roomType,
  rooms,
  themeType,
  themes,
  locations,
  houseStyles,
  materials,
  seasons,
  houseStyleType,
  materialType,
  locationType,
  seasonType,
  lightingType,
  lightings,
  interiorStyleType,
  interiorStyles,
  buildingTypes,
  buildingType,
} from "../../utils/dropdownTypes";
import { useSupabase } from "../../components/supabaseProvider";

const uploader = Uploader({
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    : "free",
});

const options = {
  maxFileCount: 1,
  mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
  editor: { images: { crop: false } },
  // styles: {
  //   colors: {
  //     primary: "#2563EB", // Primary buttons & links
  //     error: "#d23f4d", // Error messages
  //     shade100: "#fff", // Standard text
  //     shade200: "#fffe", // Secondary button text
  //     shade300: "#fffd", // Secondary button text (hover)
  //     shade400: "#fffc", // Welcome text
  //     shade500: "#fff9", // Modal close button
  //     shade600: "#fff7", // Border
  //     shade700: "#fff2", // Progress indicator background
  //     shade800: "#fff1", // File item background
  //     shade900: "#ffff", // Various (draggable crop buttons, etc.)
  //   },
  // },
};

function page() {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [restoredLoaded, setRestoredLoaded] = useState<boolean>(false);
  const [sideBySide, setSideBySide] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [theme, setTheme] = useState<themeType>("Modern");
  const [room, setRoom] = useState<roomType>("Living Room");

  const [houseStyle, setHouseStyle] = useState<houseStyleType>("Modern");
  const [season, setSeason] = useState<seasonType>("Autumn");
  const [material, setMaterial] = useState<materialType>("Wooden");
  const [location, setLocation] = useState<locationType>("Cliff");
  const [buildingType, setBuildingType] =
    useState<buildingType>("Residential Home");

  const [interiorStyle, setInteriorStyle] =
    useState<interiorStyleType>("Minimalist Haven");
  const [lighting, setLighting] = useState<lightingType>("Ambient");

  const [edit, setEdit] = useState(true);
  const [uploaded, setUploaded] = useState(false);

  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [user, setUser] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [packageName, setPackageName] = useState("");

  // supaabse stuff
  const { supabase, packageType } = useSupabase();

  const acceptedFileTypes = ["image/png", "image/jpeg"];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      if (file && acceptedFileTypes.includes(file.type)) {
        const reader = new FileReader();

        reader.onload = () => {
          setImageURL(reader.result as string);
          setOriginalPhoto(reader.result as string);
          setIsLoading(false);
        };
        if (file) {
          reader.readAsDataURL(file);
        }
      } else {
        alert(
          "We only accept PNG, JPG and JPEG files, please try uploading another image."
        );
      }
    }
    // console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onloadstart = () => {
      setIsLoading(true);
    };

    reader.onload = () => {
      setImageURL(reader.result as string);
      const re = reader.result;
      if (typeof reader.result === "string") {
        setOriginalPhoto(reader.result.replace("raw", "thumbnail"));
      } else {
        // Handle the case when reader.result is not a string
      }

      setIsLoading(false);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  function newImage() {
    setOriginalPhoto("");
    setRestoredImage("");
  }

  const UploadDropZone = () => (
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpdate={(file) => {
        if (file.length !== 0) {
          setPhotoName(file[0].originalFile.originalFileName);
          setOriginalPhoto(file[0].fileUrl.replace("raw", "thumbnail"));

          // generatePhoto(file[0].fileUrl.replace("raw", "thumbnail"));
        }
      }}
      width="700px"
      height="250px"
    />
  );

  // async function generatePhoto(fileUrl: string) {
  //   await new Promise((resolve) => setTimeout(resolve, 200));
  //   // setEdit(false);
  //   setLoading(true);
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  //   try {
  //     const res = await fetch("/generate-interior", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         imageUrl: fileUrl,
  //         lighting,
  //         interiorStyle,
  //       }),
  //     });
  //     let newPhoto = await res.json();
  //     if (res.status !== 200) {
  //       setError(newPhoto);
  //     } else {
  //       setRestoredImage(newPhoto[1]);
  //     }
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 1300);
  //   } catch (error) {
  //     alert(error);
  //   }
  // }

  async function generatePhoto(fileUrl: string) {
    try {
      setLoading(true);
      window.scrollTo({ top: 0, behavior: "smooth" });

      const response = await fetch("/generate-interior", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: fileUrl,
          lighting,
          interiorStyle,
          buildingType,
        }),
      });

      if (response.ok) {
        const newPhoto = await response.json();
        console.log(newPhoto);
        setRestoredImage(newPhoto[1]);
      } else if (response.status === 504) {
        alert(
          "Experiencing timeouts? Upgrade to our Pro plan for unlimited images and priority access. Elevate your design process with MyArchitectAI's seamless performance."
        );
      } else {
        throw new Error("Failed to generate photo");
      }
    } catch (error: any) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="m-auto">
      {packageType !== "free" ? null : (
        <div className="bg-blue-500 text-center text-white py-2">
          <span>
            You are currently on the limited Free Plan{" "}
            <Link
              href="https://myarchitectai.lemonsqueezy.com/checkout/buy/875159c9-3c87-4ce1-8e2f-557191a03115"
              target="_blank"
              className="underline font-bold"
            >
              Upgrade to Premium for more features
            </Link>
          </span>
        </div>
      )}
      <Header />

      <div className="border-t lg:flex">
        <div className="lg:w-1/3 lg:border-r p-7 space-y-5">
          {packageType !== "free" ? (
            <div className="pb-5">
              <button className="bg-sky-300 text-sky-700 border-sky-700 rounded-md border px-5 py-1 text-sm font-bold">
                Pro Plan
              </button>
            </div>
          ) : (
            <div className="pb-5">
              <button className="bg-yellow-300 text-yellow-700 border-yellow-700 rounded-md border px-5 py-1 text-sm font-bold">
                Free Plan
              </button>
            </div>
          )}
          <span className="font-bold text-2xl underline">
            Interior Architecture Design Studio
          </span>
          <div>
            <span className="text-stone-600 text-sm">
              Our AI-powered app automates the process of remodeling and
              revisualizing scenes. Simply upload your sketches or photos, and
              watch as the app transforms them into stunning designs in various
              styles and preferences.
            </span>
          </div>
          <div className="flex justify-between w-full pb-5">
            <span className="font-bold text-stone-600">Upload Image</span>
            {!originalPhoto ? null : (
              <div className="cursor-pointer" onClick={() => newImage()}>
                <span className="underline">New image</span>
              </div>
            )}
          </div>
          {originalPhoto ? (
            <Image src={originalPhoto} className="rounded-md border" />
          ) : (
            <div
              {...getRootProps()}
              className={`${
                isDragActive ? "bg-sky-200" : "bg-slate-50"
              } cursor-pointer text-center p-10 rounded-md border-dashed border-2 `}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the file here ...</p>
              ) : (
                <p>Drag and drop or click to upload image +</p>
              )}
            </div>
          )}

          {packageType == "free" ? (
            <>
              <div className="space-y-4 w-full ">
                <div className="flex mt-10 items-center space-x-3 text-stone-600">
                  <p className="text-left font-bold">
                    Choose your building type ({buildingTypes.length})
                  </p>
                </div>
                <DropDownRestricted
                  theme={buildingType}
                  setTheme={(newBuildingType) =>
                    setBuildingType(newBuildingType as typeof buildingType)
                  }
                  themes={buildingTypes}
                />
              </div>
              <div className="space-y-4 w-full ">
                <div className="flex mt-10 items-center space-x-3 text-stone-600">
                  <p className="text-left font-bold">
                    Choose your style ({interiorStyles.length})
                  </p>
                </div>
                <DropDownRestricted
                  theme={interiorStyle}
                  setTheme={(newInteriorStyle) =>
                    setInteriorStyle(newInteriorStyle as typeof interiorStyle)
                  }
                  themes={interiorStyles}
                />
              </div>

              <div className="space-y-4 w-full ">
                <div className="flex mt-10 items-center space-x-3 text-stone-600">
                  <p className="text-left font-bold">
                    Choose your lighting ({lightings.length})
                  </p>
                </div>
                <DropDownRestricted
                  theme={lighting}
                  setTheme={(newLighting) =>
                    setLighting(newLighting as typeof lighting)
                  }
                  themes={lightings}
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4 w-full ">
                <div className="flex mt-10 items-center space-x-3 text-stone-600">
                  <p className="text-left font-bold">
                    Choose your building type ({buildingTypes.length})
                  </p>
                </div>
                <DropDown
                  theme={buildingType}
                  setTheme={(newBuildingType) =>
                    setBuildingType(newBuildingType as typeof buildingType)
                  }
                  themes={buildingTypes}
                />
              </div>
              <div className="space-y-4 w-full ">
                <div className="flex mt-10 items-center space-x-3 text-stone-600">
                  <p className="text-left font-bold">
                    Choose your style ({interiorStyles.length})
                  </p>
                </div>
                <DropDown
                  theme={interiorStyle}
                  setTheme={(newInteriorStyle) =>
                    setInteriorStyle(newInteriorStyle as typeof interiorStyle)
                  }
                  themes={interiorStyles}
                />
              </div>

              <div className="space-y-4 w-full ">
                <div className="flex mt-10 items-center space-x-3 text-stone-600">
                  <p className="text-left font-bold">
                    Choose your lighting ({lightings.length})
                  </p>
                </div>
                <DropDown
                  theme={lighting}
                  setTheme={(newLighting) =>
                    setLighting(newLighting as typeof lighting)
                  }
                  themes={lightings}
                />
              </div>
            </>
          )}

          <button
            onClick={() => {
              originalPhoto
                ? generatePhoto(originalPhoto)
                : console.log("no photo");
            }}
            className="bg-blue-500 rounded-full text-white font-medium px-4 py-2 mt-8 hover:bg-blue-500/80 transition w-full"
          >
            Generate my interior
          </button>
        </div>
        <div className="lg:w-2/3 p-7 space-y-5">
          <div className="border-b pb-5">
            <span className="font-bold">Generated Image</span>
            <div>
              <span className="text-stone-600 text-sm">
                Your generated image will show up here.
              </span>
            </div>
          </div>

          {loading && (
            <button
              disabled
              className="bg-blue-500 rounded-full text-white font-medium px-4 pt-2 pb-3 mt-8 w-40"
            >
              <span className="pt-4">
                <LoadingDots color="white" style="large" />
              </span>
            </button>
          )}
          <div>
            {restoredImage && originalPhoto && !sideBySide && !loading && (
              <div className="">
                <div className="sm:mt-0 mt-8">
                  <div className="rounded-md">
                    <div className="p-3  rounded-md">
                      <span className="text-sm font-bold">
                        {interiorStyle} interior, {lighting} lighting.
                      </span>
                      <div>
                        <span className="text-xs">Click image to expand</span>
                      </div>
                    </div>
                    <Image
                      alt="restored photo"
                      src={restoredImage}
                      //   className="rounded-2xl relative sm:mt-0 mt-2 cursor-zoom-in w-full "
                      // width={600}
                      className="rounded-md w-full"
                      // onLoad={() => setRestoredLoaded(true)}
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    restoredImage
                      ? downloadPhoto(
                          restoredImage,
                          `${interiorStyle} interior, ${lighting} lighting.`
                        )
                      : console.log("no photo");
                  }}
                  className="bg-blue-500 rounded-full text-white font-medium px-4 py-2 mt-8 hover:bg-blue-500/80 transition"
                >
                  Download Image
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
