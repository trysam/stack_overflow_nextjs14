import Metrics from "@/components/shared/Metrics";
import { getQuestionById } from "@/lib/actions/questions.actions";
import { getTimestamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import ParseHTML from "@/components/shared/ParseHTML";
import AnswwerForm from "@/components/forms/AnswerForm";
import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";

import RenderTag from "@/components/shared/RenderTag";
import AnswerCard from "@/components/cards/AnswerCard";
import { Button } from "@/components/ui/button";
import Votes from "@/components/shared/Votes";

const page = async ({ params }: { params: { questionId: string } }) => {
  const questionbyId = await getQuestionById(params);

  if (!questionbyId) {
    throw new Error("Question not found");
  }

  const { userId } = auth();

  let mongooseUser;
  let mongooseUserId;

  if (userId) {
    mongooseUser = await getUserById({ userId });
  }

  mongooseUser ? (mongooseUserId = mongooseUser._id) : (mongooseUserId = "");

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-6 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${questionbyId.author.clerkId}`}
            className=" flex items-center gap-1"
          >
            <Image
              src={questionbyId.author.picture}
              width={22}
              height={22}
              alt="profile"
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {questionbyId.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type="Question"
              itemId={JSON.stringify(questionbyId._id)}
              userId={JSON.stringify(mongooseUserId)}
              upvotes={questionbyId.upvotes.length}
              downvotes={questionbyId.downvotes.length}
              hasupVoted={questionbyId.upvotes.includes(mongooseUserId)}
              hasdownVoted={questionbyId.downvotes.includes(mongooseUserId)}
              hasSaved={
                mongooseUser
                  ? mongooseUser.saved.includes(questionbyId._id)
                  : false
              }
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 text-left">
          {questionbyId.title}
        </h2>

        <div className="mb-8 mt-5 flex flex-wrap gap-4">
          <Metrics
            title={""}
            value={`Asked ${getTimestamp(questionbyId.createdAt)}`}
            imgAlt="upvotes clock"
            imgURL={"/assets/icons/clock.svg"}
            textStyle="small-medium max-sm:subtle-regular capitalize"
          />
          <Metrics
            title="answers"
            value={questionbyId.answers.length}
            imgAlt="answers icon"
            imgURL="/assets/icons/message.svg"
            textStyle="small-medium max-sm:subtle-regular capitalize"
          />
          <Metrics
            title="views"
            value={questionbyId.views}
            imgAlt="views icon"
            imgURL="/assets/icons/eye.svg"
            textStyle="small-medium max-sm:subtle-regular capitalize"
          />
        </div>

        <div className=" flex flex-wrap gap-10">
          <div className="max-sm:w-[320px] sm:max-w-[760px] xl:w-[520px]">
            <ParseHTML data={questionbyId.description} />
            <div className="mt-3.5 flex flex-wrap gap-2">
              {questionbyId.tags.map((tag: { _id: string; name: string }) => (
                <div key={tag._id}>
                  <RenderTag content={tag.name} _id={tag._id} />
                </div>
              ))}
            </div>
          </div>

          <AnswerCard
            questionIdString={JSON.stringify(questionbyId._id)}
            mongoUserId={JSON.stringify(mongooseUserId)}
          />

          {mongooseUser ? (
            <AnswwerForm
              questionId={JSON.stringify(questionbyId._id)}
              mongoUserId={JSON.stringify(mongooseUser._id)}
            />
          ) : (
            <Button
              className="primary-gradient paragraph-medium min-h-[48px] px-6 text-light-900 sm:max-w-[210px] sm:self-end"
              type="button"
            >
              <Link href="/sign-in" className="flex items-center gap-2 ">
                Sign In to Answer
              </Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
export default page;
