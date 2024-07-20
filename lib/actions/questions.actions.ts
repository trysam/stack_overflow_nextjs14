"use server";
import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import { revalidatePath } from "next/cache";
import { CreateQuestionParams, GetQuestionsParams } from "../types";
import User from "@/database/user.model";

export async function getQuestion(params: GetQuestionsParams) {
  try {
    await connectToDatabase();
    const questions = Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return questions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    // connect to database
    connectToDatabase();

    // create question
    const { title, description, tags, author, path } = params;

    const question = await Question.create({
      title,
      description,
      author,
    });

    const tagDocuments = [];

    // create the tags or get them if they already exit
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }

    // push tags id to question document
    await Question.findByIdAndUpdate(question._id, {
      $push: {
        tags: tagDocuments,
      },
    });

    // Create an interaction record for the user's ask_question action

    // Increament Author's reputation by +5 points for creating a question
    revalidatePath(path);
    return { message: "Question created successfully", question };
  } catch (error) {
    console.log(error);
  }
}
