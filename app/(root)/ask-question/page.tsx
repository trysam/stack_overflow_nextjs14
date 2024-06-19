import QuestionForm from "@/components/forms/QuestionForm";

const Page = () => {
  return (
    <div className="w-full">
      <h1 className="h1-bold text-dark100_light900">Ask Question</h1>
      <div className="mt-3">
        <QuestionForm />
      </div>
    </div>
  );
};

export default Page;
