"use server";
import { GetTopInteractedTagsParams } from "../types";
import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    await connectToDatabase();
    const { userId, limit = 3 } = params;

    // Initialize an array to store users with their top tags
    // const usersAndTopTags = [];

    // for (const user of users) {
    const questions = await Question.find({ author: userId }).populate({
      path: "tags",
      model: Tag,
    });

    // Count the occurrences of each tag
    const tagCounts: { [key: string]: { count: number; name: string } } = {};

    questions.forEach((question) => {
      question.tags.forEach((tag: any) => {
        const tagId = tag._id;
        const tagName = tag.name;
        if (tagCounts[tagId]) {
          tagCounts[tagId].count++;
        } else {
          tagCounts[tagId] = { count: 1, name: tagName };
        }
      });
    });

    // Sort the tags by their counts in descending order
    const sortedTags = Object.entries(tagCounts).sort(
      (a, b) => b[1].count - a[1].count
    );

    // Get the top 3 tags
    const topTags = sortedTags
      .slice(0, limit)
      .map((tag) => ({ tagId: tag[0], tagName: tag[1].name }));

    // Add the user with their top tags to the array
    //   usersAndTopTags.push({
    //     user,
    //     topTags,
    //   });
    // }

    return topTags;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
