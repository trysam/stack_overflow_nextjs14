import React from "react";
import { getAnswers } from "@/lib/actions/answers.action";
import Image from "next/image";
import ParseHTML from "../shared/ParseHTML";
import Metrics from "../shared/Metrics";
import { getTimestamp } from "@/lib/utils";
import Link from "next/link";
import { AnswerFilters } from "@/constants/filters";
import Filter from "../shared/search/Filter";

interface AnswerProps {
  questionId: string;
  page?: number;
  filter?: string;
}
const AnswerCard = async ({ questionId, page, filter }: AnswerProps) => {
  const answers = await getAnswers({
    questionId,
  });

  return (
    <div>
      <div className="my-4 flex justify-between max-sm:flex-col sm:items-center">
        <h3 className="h3-semibold primary-text-gradient">
          {answers.length} Answers
        </h3>
        <Filter placeholder="Filter answer.... " filters={AnswerFilters} />
      </div>
      {answers.length > 0 ? (
        <>
          {answers.map((answer) => (
            <section
              key={answer._id}
              className=" text-dark300_light700 background-light700_dark300 mb-6 flex flex-col justify-between gap-5 rounded-md border p-7"
            >
              {/* TODO: {add SPAN id identifier} */}
              <div className="flex flex-col gap-2">
                <div className="flex items-end justify-between">
                  <div className="flex flex-col-reverse gap-5 sm:flex-row sm:gap-2 xl:flex-col-reverse xl:gap-5">
                    <Link
                      href={`/profile/${answer.author.clerkId}`}
                      className=" flex items-center gap-1"
                    >
                      <Image
                        src={answer.author.picture}
                        width={22}
                        height={22}
                        alt="profile"
                        className="rounded-full"
                      />
                      <p className="paragraph-semibold text-dark300_light700">
                        {answer.author.name}
                      </p>
                    </Link>
                    <Metrics
                      title={""}
                      value={`Answered ${getTimestamp(answer.createdAt)}`}
                      imgAlt="upvotes clock"
                      imgURL={"/assets/icons/clock.svg"}
                      textStyle="small-medium max-sm:subtle-regular capitalize"
                    />
                  </div>

                  <div className="flex justify-end">
                    {/* {TODO} */}
                    VOTING
                  </div>
                </div>
                <div className="max-sm:max-w-[260px] sm:max-w-[760px] xl:w-[520px]">
                  <ParseHTML data={answer.content} />
                </div>
                <div>
                  <Image
                    src="/assets/icons/message.svg"
                    alt="report"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </section>
          ))}
        </>
      ) : (
        <p className="paragraph-regular text-dark200_light800 mt-2">
          Be the first to answer this question. Help others by sharing your
          insights in details and providing helpful advice.
        </p>
      )}
    </div>
  );
};

export default AnswerCard;
