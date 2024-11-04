"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";

interface searchProps {
  imgSrc: string;
  placeholder: string;
  OtherClasses: string;
  route: string;
  imgPosition: string;
}

const LocalSearchBar = ({
  imgSrc,
  placeholder,
  OtherClasses,
  route,
  imgPosition,
}: searchProps) => {
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] w-full grow items-center gap-1 rounded-xl px-4 ${OtherClasses}`}
    >
      {imgPosition === "left" && (
        <Image
          src={imgSrc}
          alt="searchIcon"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={() => {}}
        />
      )}
      <Input
        type="text"
        value=""
        placeholder={placeholder}
        className="paragraph-regular background-light800_darkgradient no-focus text-dark400_light700 w-full border-none outline-none"
        onChange={() => {}}
      />

      {imgPosition === "right" && (
        <Image
          src={imgSrc}
          alt="searchIcon"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={() => {}}
        />
      )}
    </div>
  );
};

export default LocalSearchBar;
