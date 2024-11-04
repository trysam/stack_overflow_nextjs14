import QuestionForm from "@/components/forms/QuestionForm";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const userId = auth().userId;

  if (!userId) {
    redirect("/sign-in");
  }

  const mongoUser = await getUserById({ userId });
  console.log(mongoUser._id);
  const mongoUserId = JSON.stringify(mongoUser._id);

  return (
    <div className="w-full">
      <h1 className="h1-bold text-dark100_light900">Ask Question</h1>
      <div className="mt-3">
        <QuestionForm mongoUserId={mongoUserId} />
      </div>
    </div>
  );
};

export default Page;
