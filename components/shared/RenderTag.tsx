import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type props = {
  content: string;
  _id?: number | string;
  questionCount?: number;
  hasCount?: boolean;
};

const RenderTag = ({
  content,
  _id,
  questionCount = 0,
  hasCount = false,
}: props) => {
  return (
    <div>
      {_id ? (
        <Link
          href={`/tags/${_id}`}
          className="flex flex-1 items-center justify-between rounded-lg bg-transparent "
        >
          <Badge className="background-light800_dark300 text-dark500_light500 subtle-medium rounded-md px-4 py-2 uppercase">
            {content}
          </Badge>

          {hasCount && (
            <p className={`small-medium text-dark300_light700 `}>
              {questionCount}
            </p>
          )}
        </Link>
      ) : (
        <>
          <Badge className="background-light800_dark300 text-dark500_light500 subtle-medium cursor-pointer rounded-md px-4 py-2 uppercase">
            {content}
          </Badge>

          {hasCount && (
            <p className={`small-medium text-dark300_light700 `}>
              {questionCount}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default RenderTag;
