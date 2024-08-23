"use client";

import { useTheme } from "@/context/ThemeProvider";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { answerSchema } from "@/lib/validations";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import MyEditor from "../shared/Editor";
import { useRouter, usePathname } from "next/navigation";
import { createAnswer } from "@/lib/actions/answers.action";
import Image from "next/image";

interface props {
  mongoUserId: string;
  questionId: string;
}

const AnswerForm = ({ mongoUserId, questionId }: props) => {
  const { mode } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      answer: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof answerSchema>) {
    setIsSubmitting(true);

    // make asychronous call to api
    // contain all form data
    try {
      await createAnswer({
        content: values.answer,
        question: JSON.parse(questionId),
        author: JSON.parse(mongoUserId),
        path: pathname,
      });

      form.reset();
      // if (editorRef.current){
      //   const editor = editorRef.current as any;

      //   editor.setContent('')
      // }

      // navigate to home page
      router.push(`/question/${JSON.parse(questionId)}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  }

  return (
    <div>
      <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h4 className="text-dark400_light800 paragraph-semibold">
          Write your answer here
        </h4>
        <Button
          className="background-light800_dark400 btn light-border-2 rounded-md px-4 py-3.5 text-primary-500"
          type="button"
          onSubmit={() => {}}
        >
          <Image
            src="/assets/icons/stars.svg"
            alt="star"
            width={14}
            height={14}
            className="mr-2"
          />
          Generate an AI Answer
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8 "
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormControl className="mt-3.5">
                  <MyEditor mode={mode} field={field} />
                </FormControl>
                <FormDescription className="small-regular text-light-500">
                  Provide a detailed answer. Try to make it simple and easy to
                  understand. Minimum of 100 characters.
                </FormDescription>
                <FormMessage className="paragraph-semibold text-red-400" />
              </FormItem>
            )}
          />

          <Button
            className="primary-gradient paragraph-medium min-h-[48px] px-6 text-light-900 sm:max-w-[150px] sm:self-end"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Answer"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AnswerForm;
