import React from "react";
import Link from "next/link";
import RenderTag from "../shared/RenderTag";
import Metrics from "../shared/Metrics";
import { getTimestamp } from "@/lib/utils";

interface questionProps {
  title: string;
  description: string;
  tags: { _id: number; name: string }[];
  author: { name: string; _id: string; picture: string };
  date: Date;
  _id: string;
  avartarfallback: string;
  answers: {
    author: string;
    date: Date;
    id: string;
    content: string;
  }[];
  upvotes: number;
  views: number;
}

const QuestionCard = ({
  title,
  description,
  tags,
  author,
  date,
  _id,
  avartarfallback,
  answers,
  upvotes,
  views,
}: questionProps) => {
  return (
    <div className="card-wrapper w-full rounded-lg px-10 py-9 sm:px-11">
      <div className="subtle-regular text-dark300_light700 sm:hidden">
        {getTimestamp(date)}
      </div>
      <Link
        className="sm:h3-semibold base-semibold text-dark100_light900 line-clamp-1"
        href={`/question/${_id}`}
      >
        {title}
      </Link>

      {/** if signed in add edit, delete actions */}

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div key={tag._id}>
            <RenderTag content={tag.name} _id={tag._id} />
          </div>
        ))}
      </div>

      <div className=" mt-6 flex flex-wrap justify-between gap-3 max-sm:flex-col">
        <div>
          <Link href={`/questions/${_id}`}>
            <Metrics
              title={`asked ${getTimestamp(date)}`}
              value={author.name}
              imgAlt="upvotes icon"
              imgURL={author.picture}
              href={`/profiles/${author._id}`}
              textStyle="small-medium max-sm:subtle-regular capitalize"
              isAuthor={true}
              includeSeperator={true}
            />
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Metrics
            title="votes"
            value={upvotes}
            imgAlt="upvotes icon"
            imgURL="assets/icons/like.svg"
            textStyle="small-medium max-sm:subtle-regular capitalize"
          />
          <Metrics
            title="answers"
            value={answers.length}
            imgAlt="answers icon"
            imgURL="assets/icons/message.svg"
            textStyle="small-medium max-sm:subtle-regular capitalize"
          />
          <Metrics
            title="views"
            value={views}
            imgAlt="views icon"
            imgURL="assets/icons/eye.svg"
            textStyle="small-medium max-sm:subtle-regular capitalize"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
