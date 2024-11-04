import React from "react";
import Link from "next/link";
import Image from "next/image";
import RenderTag from "../RenderTag";

const Questions = [
  {
    _id: 1,
    content:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
  },
  {
    _id: 2,
    content: "Is it only me or the font is bolder than necessary?",
  },
  {
    _id: 3,
    content: "Redux Toolkit Not Updating State as Expected",
  },
  {
    _id: 4,
    content: "Can I get the course for free?",
  },
  {
    _id: 5,
    content: "Async/Await Function Not Handling Errors Properly",
  },
];

const Tags = [
  {
    _id: 1,
    tagContent: "NEXTJS",
    count: 32,
  },

  {
    _id: 2,
    tagContent: "Test",
    count: 19,
  },
  {
    _id: 3,
    tagContent: "React",
    count: 17,
  },
  {
    _id: 4,
    tagContent: "CSS",
    count: 13,
  },
  {
    _id: 5,
    tagContent: "redux",
    count: 9,
  },
];

const RightSideBar = () => {
  return (
    <section
      className={`background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 h-screen w-[350px] overflow-y-scroll border-r shadow-light-200 dark:text-light-900 dark:shadow-none max-xl:hidden`}
    >
      <div className="m-6 mt-36 flex flex-1 flex-col justify-between">
        <h3 className="h3-bold text-dark200_light900 ">Top Questions</h3>
        <div className="mt-7 flex flex-col gap-8">
          {Questions.map((questions) => {
            return (
              <Link
                href={`/questions/${questions._id}`}
                key={questions.content}
                className="text-dark300_light700 flex items-center justify-between gap-8 rounded-lg bg-transparent "
              >
                <p className="body-medium ">{questions.content}</p>
                <Image
                  alt="chevron-right"
                  src="/assets/icons/chevron-right.svg"
                  width={16}
                  height={16}
                  className="invert-colors"
                />
              </Link>
            );
          })}
        </div>

        <h3 className="h3-bold text-dark200_light900 mt-20 ">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {Tags.map((tag) => (
            <RenderTag
              key={tag._id}
              content={tag.tagContent}
              _id={tag._id}
              hasCount={true}
              questionCount={tag.count}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSideBar;
