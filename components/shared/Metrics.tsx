import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface metricsProps {
  value: string | number;
  imgURL: string;
  imgAlt: string;
  title: string;
  href?: string;
  textStyle: string;
  isAuthor?: boolean;
  includeSeperator?: boolean;
}

const Metrics = ({
  value,
  imgURL,
  imgAlt,
  title,
  href,
  textStyle,
  isAuthor,
  includeSeperator = false,
}: metricsProps) => {
  return (
    <div className={`text-dark200_light800 flex items-center gap-1 `}>
      <Image
        src={imgURL}
        alt={imgAlt}
        width={16}
        height={16}
        className={`object-contain ${href ? "rounded-full" : ""}`}
      />
      <p className={`${textStyle} flex items-center gap-1`}>
        <span>{formatNumber(value)}</span>
        {includeSeperator && (
          <div className="size-1 rounded-full bg-dark-100 dark:bg-light-850 max-sm:hidden" />
        )}
        <span
          className={`small-regular line-clamp-1 capitalize ${isAuthor ? "max-sm:hidden" : ""}`}
        >
          {title}
        </span>
      </p>
    </div>
  );
};

export default Metrics;
