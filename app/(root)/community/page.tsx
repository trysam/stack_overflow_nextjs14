import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import Filter from "@/components/shared/search/Filter";
import { UserFilters } from "@/constants/filters";
import NoResultFound from "@/components/shared/NoResultFound";
import { getAllUsers } from "@/lib/actions/user.action";
import UserCard from "@/components/cards/UserCard";
import { getTopInteractedTags } from "@/lib/actions/tag.action";

const Home = async () => {
  const users = await getAllUsers({});

  const usersAndTopTags = [];

  for (const user of users) {
    const topTags = await getTopInteractedTags({ userId: user._id });
    usersAndTopTags.push({
      user,
      topTags,
    });
  }

  return (
    <>
      <div className="flex flex-1 flex-col-reverse sm:flex-row sm:items-center sm:justify-between ">
        <h1 className="h1-bold text-dark100_light900 ">All Users</h1>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:w-4/5 xl:w-full">
        <LocalSearchBar
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing minds..."
          OtherClasses="flex-1"
          route="/community"
          imgPosition="left"
        />
        <Filter
          placeholder={"Select a Filter"}
          filters={UserFilters}
          otherClasses="min-h-[64px] sm:min-w-[170px]"
          containerClasses="max-md:flex"
        />
      </div>
      <section className="mt-10 flex w-full cursor-pointer flex-wrap gap-6">
        {usersAndTopTags.length > 0 ? (
          usersAndTopTags.map((userAndTag) => (
            <UserCard
              key={userAndTag.user.id}
              name={userAndTag.user.name}
              tags={userAndTag.topTags}
              picture={userAndTag.user.picture}
              username={userAndTag.user.username}
              userId={userAndTag.user.clerkId}
            />
          ))
        ) : (
          <NoResultFound
            title="There's no user to show"
            description="Be the first to break the silence! 
          Ask a Question and Kickstart the discussion, our query could
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
