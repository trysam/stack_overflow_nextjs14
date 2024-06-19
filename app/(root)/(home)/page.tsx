import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/search/Filter";
import { HomePageFilters } from "@/constants/filters";
import { questions } from "@/constants/homeQuestions";

import QuestionCard from "@/components/cards/QuestionCard";
import NoResultFound from "@/components/shared/NoResultFound";

const Home = () => {
  return (
    <>
      <div className="flex flex-1 flex-col-reverse sm:flex-row sm:items-center sm:justify-between ">
        <h1 className="h1-bold text-dark100_light900 ">All Questions </h1>
        <Link href="/ask-question" className="flex justify-end">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col">
        <LocalSearchBar
          imgSrc="/assets/icons/search.svg"
          placeholder="Search questions..."
          OtherClasses="flex-1"
          route="/"
          imgPosition="left"
        />
        <Filter
          placeholder={"Select a Filter"}
          filters={HomePageFilters}
          otherClasses="min-h-[64px] sm:min-w-[170px]"
          containerClasses=" hideden max-md:flex"
        />
      </div>
      <div className="mt-10 max-md:hidden">
        <HomeFilters />
      </div>
      <div className="mt-10 flex w-full flex-wrap gap-6 ">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              description={question.description}
              _id={question._id}
              title={question.title}
              date={question.date}
              author={question.author}
              tags={question.tags}
              avatarImage={question.avatarImage}
              avartarfallback={question.avartarfallback}
              answers={question.answers}
              upvotes={question.upvotes}
              views={question.views}
            />
          ))
        ) : (
          <NoResultFound
            title="There's no question to show"
            description="Be the first to break the silence! 
          Ask a Question and Kickstart the discussion, our query could
           be the next big thing other learns from. Get involved!"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default Home;
