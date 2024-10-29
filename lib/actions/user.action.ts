"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  UpdateUserParams,
  GetUserByIdParams,
  ToggleSaveQuestionParams,
} from "../types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    await connectToDatabase();

    const users = await User.find({});
    return users;

    // // Initialize an array to store users with their top tags
    // const usersAndTopTags = [];

    // for (const user of users) {
    //   const questions = await Question.find({ author: user._id }).populate({
    //     path: "tags",
    //     model: Tag,
    //   });

    //   // Count the occurrences of each tag
    //   const tagCounts: { [key: string]: { count: number; name: string } } = {};

    //   questions.forEach((question) => {
    //     question.tags.forEach((tag: any) => {
    //       const tagId = tag._id;
    //       const tagName = tag.name;
    //       if (tagCounts[tagId]) {
    //         tagCounts[tagId].count++;
    //       } else {
    //         tagCounts[tagId] = { count: 1, name: tagName };
    //       }
    //     });
    //   });

    //   // Sort the tags by their counts in descending order
    //   const sortedTags = Object.entries(tagCounts).sort(
    //     (a, b) => b[1].count - a[1].count
    //   );

    //   // Get the top 3 tags
    //   const topTags = sortedTags
    //     .slice(0, 3)
    //     .map((tag) => ({ tagId: tag[0], tagName: tag[1].name }));

    //   // Add the user with their top tags to the array
    //   usersAndTopTags.push({
    //     user,
    //     topTags,
    //   });
    // }

    // return usersAndTopTags;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserById(params: GetUserByIdParams) {
  try {
    await connectToDatabase();

    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {}
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create({
      clerkId: userData.clerkId,
      name: userData.name,
      username: userData.username,
      email: userData.email,
      picture: userData.picture,
    });
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    await connectToDatabase();
    const { clerkId, updateData, path } = params;
    const user = await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    if (!user) {
      throw new Error(`User with id ${clerkId} not found`);
    }

    revalidatePath(path);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    await connectToDatabase();
    const { clerkId } = params;
    const user = await User.findOne({ clerkId });
    if (!user) {
      throw new Error(`User with id ${clerkId} not found`);
    }

    // Delete the user from the database
    // delete everything related to the user such as question, answers, comments, likes, etc.

    // TODO: Get all the question ids that belong to the user
    // const userQuestionIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );

    // Delete all the questions that belong to the user
    await Question.deleteMany({ author: user._id });

    // TODO: Delete all the answers, commment, views and so on that belong to the user

    // Delete the user
    const deletedUser = await User.findOneAndDelete({ clerkId });
    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  const { userId, questionId, hasSaved, path } = params;
  try {
    await connectToDatabase();
    if (hasSaved) {
      // delete from database
      await User.findByIdAndUpdate(userId, {
        $pull: {
          saved: questionId,
        },
      });
    } else {
      // add to database
      await User.findByIdAndUpdate(userId, {
        $push: {
          saved: questionId,
        },
      });
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
