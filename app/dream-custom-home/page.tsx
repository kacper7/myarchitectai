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
import DropDownRestricted from "../../components/DropDownRestricted";
import { Image, Alert } from "antd";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Link from "next/link";
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
  buildingType,
  buildingTypes,
  floors,
  floorsType,
  colors,
  colorType,
} from "../../utils/dropdownTypes";
import { useSupabase } from "../../components/supabaseProvider";
import { User } from "@supabase/supabase-js";

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
  const [floor, setFloor] = useState<floorsType>("Single Level");
  const [color, setColor] = useState<colorType>("Black");
  const [extraPrompt, setExtraPrompt] = useState("");

  const [edit, setEdit] = useState(true);
  const [uploaded, setUploaded] = useState(false);

  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [highlight, setHighlight] = useState(false);

  const [userPrompt, setUserPrompt] = useState("");

  // supaabse stuff
  // const [packageType, setPackageType] = useState("free");
  const { supabase, packageType } = useSupabase();

  // async function checkUserPackage() {
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();
  //   if (user) {
  //     const { data, error } = await supabase
  //       .from("myarchitectai_users")
  //       .select("*")
  //       .eq("email", user.email)
  //       .single();

  //     if (data) {
  //       console.log(data);

  //       switch (data.package) {
  //         case "free":
  //           break;
  //         case "pro":
  //           setPackageType("pro");
  //           break;
  //         default:
  //           break;
  //       }
  //     }
  //   }
  // }

  // useEffect(() => {
  //   checkUserPackage();
  // }, []);

  const handleDragEnter = (event: any) => {
    event.preventDefault();
    setHighlight(true);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleDragLeave = () => {
    setHighlight(false);
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    setHighlight(false);

    const files = event.dataTransfer.files;

    // Handle the dropped files
    for (const file of files) {
      // Perform further processing (e.g., display the image)
      // displayImage(file);
      // setOriginalPhoto(file);
      const reader = new FileReader();
      reader.onload = function (event: any) {
        alert(reader.readAsDataURL(file));
      };
    }
  };

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
      setOriginalPhoto(reader.result as string);
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

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
    acceptedFiles,
    isDragAccept,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
  });

  async function generatePhoto() {
    try {
      setLoading(true);
      window.scrollTo({ top: 0, behavior: "smooth" });

      const response = await fetch("/generate-custom-home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          floor,
          color,
          location,
          extraPrompt,
        }),
      });

      if (response.ok) {
        const newPhoto = await response.json();
        console.log(newPhoto);
        setRestoredImage(newPhoto[0]);
      } else if (response.status === 504) {
        alert(
          "Experiencing timeouts? Upgrade to our Pro plan for unlimited images and priority access. Elevate your design process with MyArchitectAI's seamless performance."
        );
      } else if (response.status === 413) {
        alert("Try uploading another picture, file size is too large.");
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
      {/* <Header /> */}

      {packageType !== "free" ? null : (
        <div className="bg-blue-500 text-center text-white py-2">
          <span>
            You are currently on the limited Free Plan{" "}
            <Link
              href="/link-to-premium"
              target="_blank"
              className="underline font-bold"
            >
              Upgrade to Premium for more features
            </Link>
          </span>
        </div>
      )}

      <div className="px-5">
        <Header />
      </div>

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
            Custom Modular Home Design Studio
          </span>
          <div>
            <span className="text-stone-600 text-sm">
              Our AI-powered app automates the process of modeling and
              visualizing scenes. Simply input your preffered parameters, and
              watch as the app transforms them into stunning designs in various
              styles and preferences.
            </span>
          </div>

          <div>
            {fileRejections.length > 0 && (
              <Alert
                message="Error Text"
                description="Error Description Error Description Error Description Error Description Error Description Error Description"
                type="error"
                closable
              />
            )}
          </div>

          {packageType == "free" ? (
            <>
              <div className="space-y-4 w-full ">
                <div className="flex mt-10 items-center space-x-3">
                  <p className="text-left font-bold font-bold text-stone-600">
                    Choose the number of floors ({floors.length})
                  </p>
                </div>
                <DropDown
                  theme={floor}
                  setTheme={(newFloorType) =>
                    setFloor(newFloorType as typeof floor)
                  }
                  themes={floors}
                />
              </div>

              <div className="space-y-4 w-full ">
                <div className="flex mt-10 items-center space-x-3">
                  <p className="text-left font-bold font-bold text-stone-600">
                    Choose the color ({colors.length})
                  </p>
                </div>
                <DropDown
                  theme={color}
                  setTheme={(newColor) => setColor(newColor as typeof color)}
                  themes={colors}
                />
              </div>

              <div className="space-y-4 w-full ">
                <div className="flex mt-10 items-center space-x-3 text-stone-600">
                  <p className="text-left font-bold">
                    Choose your location ({locations.length})
                  </p>
                </div>
                <DropDown
                  theme={location}
                  setTheme={(newLocation) =>
                    setLocation(newLocation as typeof location)
                  }
                  themes={locations}
                />
              </div>

              <div className="space-y-4 w-full">
                <div className="items-center text-stone-600 mt-10">
                  <span className="text-left font-bold">Custom Preferences</span>
                </div>
                <textarea
                  onChange={(e) => setExtraPrompt(e.target.value)}
                  className="rounded-md border border-stone-300 px-3 py-2 w-full h-24"
                  placeholder="Night time, Cozy, Scandinavian, Swimming Pool, Backyard,..."
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4 w-full ">
                <div className="flex mt-10 items-center space-x-3">
                  <p className="text-left font-bold font-bold text-stone-600">
                    Choose the number of floors ({floors.length})
                  </p>
                </div>
                <DropDown
                  theme={floor}
                  setTheme={(newFloorType) =>
                    setFloor(newFloorType as typeof floor)
                  }
                  themes={floors}
                />
              </div>

              <div className="space-y-4 w-full ">
                <div className="flex mt-10 items-center space-x-3">
                  <p className="text-left font-bold font-bold text-stone-600">
                    Choose the color ({colors.length})
                  </p>
                </div>
                <DropDown
                  theme={color}
                  setTheme={(newColor) => setColor(newColor as typeof color)}
                  themes={colors}
                />
              </div>

              <div className="space-y-4 w-full ">
                <div className="flex mt-10 items-center space-x-3 text-stone-600">
                  <p className="text-left font-bold">
                    Choose your location ({locations.length})
                  </p>
                </div>
                <DropDown
                  theme={location}
                  setTheme={(newLocation) =>
                    setLocation(newLocation as typeof location)
                  }
                  themes={locations}
                />
              </div>
            </>
          )}

          <button
            onClick={() => {
              generatePhoto();
            }}
            className="bg-blue-500 rounded-full text-white font-medium px-4 py-2 mt-8 hover:bg-blue-500/80 transition w-full"
          >
            Build my idea
          </button>
        </div>
        <div className="lg:w-2/3 p-7 space-y-3 bg-white">
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
            {restoredImage && !loading && (
              <div className="">
                <div className="sm:mt-0 mt-8">
                  <div className="rounded-md">
                    <div className="p-3  rounded-md">
                      <span className="text-sm font-bold">
                        {/* {houseStyle} {material} house, {location}, {season} */}
                      </span>
                      <div>
                        {" "}
                        <span className="text-xs">Click image to expand</span>
                      </div>
                    </div>
                    <Image
                      alt="restored photo"
                      src={restoredImage}
                      //   className="rounded-2xl relative sm:mt-0 mt-2 cursor-zoom-in w-full "
                      // width={600}
                      className="rounded-md"
                      // onLoad={() => setRestoredLoaded(true)}
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    restoredImage
                      ? downloadPhoto(
                          restoredImage,
                          `${houseStyle} ${material} ${buildingType}, ${location}, ${season}`
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
