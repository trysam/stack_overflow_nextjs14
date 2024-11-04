import Link from "next/link";
import { Schema } from "mongoose";
import { Badge } from "../ui/badge";

interface TagCardProps {
  tag: {
    _id: string;
    name: string;
    description: string;
    questions: Schema.Types.ObjectId[];
    followers: Schema.Types.ObjectId[];
    createdOn: Date;
  };
}

const TagCard = ({ tag }: TagCardProps) => {
  return (
    <Link href={`/tag/${tag._id}`}>
      <div className="background-light900_dark200 h-[220px] rounded-2xl p-6 shadow-light-300 dark:shadow-none sm:max-w-[254px] ">
        <Badge className="background-light800_dark400 text-dark200_light800 paragraph-semibold rounded-md px-4 py-2">
          {tag.name}
        </Badge>
        <div className="flex h-36 flex-col justify-between pt-4 ">
          <p className="small-regular line-clamp-5 text-dark-500 dark:text-light-700">
            {
              // Todo: tag.description
            }
            JavaScript, often abbreviated as JS, is a programming language that
            is one of the core technologies of the World Wide Web, alongside-
            HTML and CSS
          </p>
          <p className="mt-2 ">
            <span className="body-semibold primary-text-gradient">
              {`${tag.questions.length}+`}
            </span>{" "}
            <span className=" small-medium capitalize text-dark-500 dark:text-light-500 ">
              questions
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TagCard;
