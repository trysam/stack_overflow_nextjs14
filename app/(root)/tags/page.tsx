import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import Filter from "@/components/shared/search/Filter";
import { TagFilters } from "@/constants/filters";
import NoResultFound from "@/components/shared/NoResultFound";
import { getAllTags } from "@/lib/actions/tag.action";
import TagCard from "@/components/cards/tagCard";

const Home = async () => {
  const tags = await getAllTags({});

  return (
    <>
      <div className="flex flex-1 flex-col-reverse sm:flex-row sm:items-center sm:justify-between ">
        <h1 className="h1-bold text-dark100_light900 ">Tags</h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:w-4/5 xl:w-full">
        <LocalSearchBar
          imgSrc="/assets/icons/search.svg"
          placeholder="Search by tags name..."
          OtherClasses="flex-1"
          route="/community"
          imgPosition="left"
        />
        <Filter
          placeholder={"Most Popular"}
          filters={TagFilters}
          otherClasses="min-h-[64px] sm:min-w-[170px]"
          containerClasses="max-md:flex"
        />
      </div>
      <section className="mt-10 flex w-full cursor-pointer flex-wrap gap-6">
        {tags.length > 0 ? (
          tags.map((tag) => <TagCard key={tag._id} tag={tag} />)
        ) : (
          <NoResultFound
            title="There's no Tag yet"
            description="Be the first to break the silence! 
          Ask a Question and tag it. You can kickstart the discussion, our query could
           be the next big thing other learns from. Get involved!"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </section>
    </>
  );
};

export default Home;
