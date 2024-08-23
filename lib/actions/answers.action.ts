"use server";
import { revalidatePath } from "next/cache";
import Answer from "@/database/answer.model";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "../types";
import Question from "@/database/question.model";

export const getAnswers = async (params: GetAnswersParams) => {
  try {
    connectToDatabase();
    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      })
      .sort({ createdAt: -1 });

    return answers;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createAnswer = async (params: CreateAnswerParams) => {
  try {
    connectToDatabase();
    const { content, author, question, path } = params;
    const newAnswer = await Answer.create({
      content,
      author,
      question,
    });

    // add answer to the Question array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // TODO: Add interaction

    revalidatePath(path);
    return { message: "Answer added successfully", newAnswer };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
