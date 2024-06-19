"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { questionSchema } from "@/lib/validations";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const QuestionForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: "",
      description: "",
      tag: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof questionSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8 "
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-dark100_light900 base-bold">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="background-light800_dark400 light-border min-h-[48px] border-light-700">
                <Input
                  className="text-dark100_light900"
                  placeholder=""
                  {...field}
                />
              </FormControl>
              <FormDescription className="small-regular text-light-500">
                Be specific and imagine you’re asking a question to another
              </FormDescription>
              <FormMessage className="paragraph-semibold text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-dark100_light900 base-bold">
                Detailed explanation of your problem?{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="background-light800_dark400 light-border min-h-[48px] border-light-700">
                {/* Add form control */}
              </FormControl>
              <FormDescription className="small-regular text-light-500">
                Introduce your problem and expand on what you put in the title.
                Minimum of 20 characters.
              </FormDescription>
              <FormMessage className="paragraph-semibold text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-dark100_light900 base-bold">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="background-light800_dark400 light-border min-h-[48px] border-light-700">
                <Input
                  className="text-dark100_light900"
                  placeholder=""
                  {...field}
                />
              </FormControl>
              <FormDescription className="small-regular text-light-500">
                Add up to 5 tags to describe what your question is about. Start
                typing to see suggestions.
              </FormDescription>
              <FormMessage className="paragraph-semibold text-red-400" />
            </FormItem>
          )}
        />

        <Button
          className="primary-gradient paragraph-medium min-h-[48px] px-6 text-light-900 sm:max-w-[150px] sm:self-end"
          type="submit"
        >
          Ask a question
        </Button>
      </form>
    </Form>
  );
};

export default QuestionForm;
