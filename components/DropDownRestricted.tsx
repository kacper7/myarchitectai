import { Menu, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import { Fragment } from "react";
import {
  roomType,
  themeType,
  houseStyleType,
  materialType,
  seasonType,
  locationType,
  interiorStyleType,
  lightingType,
  buildingType,
  flooringType,
  floorsType,
  colorType,
} from "../utils/dropdownTypes";
import Link from "next/link";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface DropDownProps {
  theme:
    | themeType
    | colorType
    | floorsType
    | roomType
    | houseStyleType
    | materialType
    | seasonType
    | interiorStyleType
    | locationType
    | buildingType
    | flooringType
    | lightingType;
  setTheme: (
    theme:
      | themeType
      | roomType
      | colorType
      | floorsType
      | houseStyleType
      | materialType
      | seasonType
      | interiorStyleType
      | locationType
      | buildingType
      | flooringType
      | lightingType
  ) => void;
  themes:
    | themeType[]
    | flooringType[]
    | roomType[]
    | colorType[]
    | floorsType[]
    | houseStyleType[]
    | materialType[]
    | seasonType[]
    | lightingType[]
    | buildingType[]
    | interiorStyleType[]
    | locationType[];
}

// TODO: Change names since this is a generic dropdown now
export default function DropDown({ theme, setTheme, themes }: DropDownProps) {
  return (
    <Menu as="div" className="relative block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-between items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black">
          {theme}
          <ChevronUpIcon
            className="-mr-1 ml-2 h-5 w-5 ui-open:hidden"
            aria-hidden="true"
          />
          <ChevronDownIcon
            className="-mr-1 ml-2 h-5 w-5 hidden ui-open:block"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden bottom-full"
          key={theme}
        >
          <div className="max-h-[250px] overflow-auto">
            {themes.map((themeItem, index) => (
              <Menu.Item key={themeItem}>
                {({ active }) => (
                  <button
                    onClick={() => setTheme(themeItem)}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      themeItem === theme ? "bg-gray-200" : "",
                      "px-4 py-2 text-sm w-full text-left flex items-center space-x-2 justify-between",
                      index >= 3 ? "disabled" : "" // Add 'disabled' class for options beyond the first three
                    )}
                    disabled={index >= 3} // Disable options beyond the first three
                  >
                    <div className="flex justify-between w-full">
                      <div>
                        <span>{themeItem}</span>
                      </div>
                      {index >= 3 ? (
                        <div>
                          <span
                            role="img"
                            aria-label="Locked"
                            className="underline"
                          >
                            🔒{" "}
                            <Link
                              href={
                                ""
                              }
                              target="_blank"
                            >
                              Upgrade
                            </Link>
                          </span>
                        </div>
                      ) : null}
                    </div>
                    {themeItem === theme ? (
                      <CheckIcon className="w-4 h-4 text-bold" />
                    ) : null}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
