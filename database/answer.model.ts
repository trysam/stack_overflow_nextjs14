import { Schema, model, models, Document } from "mongoose";

// Define the Answer schema interface
interface IAnswer extends Document {
  content: string;
  author: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  upVotes: Schema.Types.ObjectId[];
  downVotes: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Define the Answer schema
const answerSchema = new Schema<IAnswer>({
  content: {
    type: String,
    required: true,
  },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  upVotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downVotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create the Answer model
const Answer = models.Answer || model<IAnswer>("Answer", answerSchema);

export default Answer;
