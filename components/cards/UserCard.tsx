import Image from "next/image";
import React from "react";
import RenderTag from "../shared/RenderTag";
import Link from "next/link";
import { Badge } from "../ui/badge";

interface propUserCard {
  name: string;
  picture: string;
  username: string;
  tags: {
    tagName: string;
    tagId: string;
  }[];
  userId: string;
}

const UserCard = ({ name, picture, username, tags, userId }: propUserCard) => {
  return (
    <Link className="" href={`profile/${userId}`} passHref legacyBehavior>
      <article className="background-light900_dark200 mb-6 flex w-[254px]  flex-col items-center rounded-2xl  p-2 shadow-light-300 dark:shadow-none ">
        <Image
          src={picture}
          width={100}
          height={100}
          alt="user profile picture"
          className="rounded-full"
        />

        <h3 className="h3-semibold line-clamp-1 pt-6 text-dark-100 dark:text-light-900">
          {name}
        </h3>
        <p className="body-regular pt-2 text-dark-500 dark:text-light-500">
          {`@${username}`}
        </p>
        {tags.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-1 py-6">
            {tags.map((tag) => (
              <RenderTag
                key={tag.tagId}
                content={tag.tagName}
                _id={tag.tagId}
              />
            ))}
          </div>
        ) : (
          <Badge className="background-light800_dark300 text-dark500_light500 subtle-medium mt-2 rounded-md px-4 py-2 capitalize">
            No tag yet
          </Badge>
        )}
      </article>
    </Link>
  );
};

export default UserCard;
