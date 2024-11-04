"use server";
import { AnswerVoteParams, QuestionVoteParams } from "./../types.d";
import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.model";
import Answer from "@/database/answer.model";
import { revalidatePath } from "next/cache";

export async function downvoteQuestion(params: QuestionVoteParams) {
  const { questionId, userId, hasupVoted, hasdownVoted, path } = params;
  try {
    await connectToDatabase();

    if (hasdownVoted) {
      await Question.findByIdAndUpdate(questionId, {
        $pull: { downvotes: userId },
      });
    } else if (hasupVoted) {
      await Question.findByIdAndUpdate(questionId, {
        $pull: { upvotes: userId },
      });
      await Question.findByIdAndUpdate(questionId, {
        $push: { downvotes: userId },
      });
    } else {
      await Question.findByIdAndUpdate(questionId, {
        $push: { downvotes: userId },
      });
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to downvote question");
  }
}

export async function upvoteQuestion(params: QuestionVoteParams) {
  const { questionId, userId, hasupVoted, hasdownVoted, path } = params;
  try {
    await connectToDatabase();
    if (hasupVoted) {
      await Question.findByIdAndUpdate(questionId, {
        $pull: { upvotes: userId },
      });
    } else if (hasdownVoted) {
      await Question.findByIdAndUpdate(questionId, {
        $pull: { downvotes: userId },
      });
      await Question.findByIdAndUpdate(questionId, {
        $push: { upvotes: userId },
      });
    } else {
      await Question.findByIdAndUpdate(questionId, {
        $push: { upvotes: userId },
      });
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to upvote question");
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  const { answerId, userId, hasupVoted, hasdownVoted, path } = params;
  try {
    await connectToDatabase();
    if (hasdownVoted) {
      await Answer.findByIdAndUpdate(answerId, {
        $pull: { downVotes: userId },
      });
    } else if (hasupVoted) {
      await Answer.findByIdAndUpdate(answerId, {
        $pull: { upVotes: userId },
      });
      await Answer.findByIdAndUpdate(answerId, {
        $push: { downVotes: userId },
      });
    } else {
      await Answer.findByIdAndUpdate(answerId, {
        $push: { downVotes: userId },
      });
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to downvote answer");
  }
}

export async function upvoteAnswer(param: AnswerVoteParams) {
  try {
    await connectToDatabase();

    const { answerId, userId, hasupVoted, hasdownVoted, path } = param;

    if (hasupVoted) {
      await Answer.findByIdAndUpdate(answerId, {
        $pull: { upVotes: userId },
      });
    } else if (hasdownVoted) {
      await Answer.findByIdAndUpdate(answerId, {
        $pull: { downVotes: userId },
      });
      await Answer.findByIdAndUpdate(answerId, {
        $push: { upVotes: userId },
      });
    } else {
      await Answer.findByIdAndUpdate(answerId, {
        $push: { upVotes: userId },
      });
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to upvote answer");
  }
}
