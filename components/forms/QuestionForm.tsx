"use client";

import { useTheme } from "@/context/ThemeProvider";
import React, { useState } from "react";
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
import MyEditor from "../shared/Editor";
import RenderTag from "../shared/RenderTag";
import { createQuestion } from "@/lib/actions/questions.actions";
import { useRouter, usePathname } from "next/navigation";

const type: any = "create";

interface props {
  mongoUserId: string;
}

const QuestionForm = ({ mongoUserId }: props) => {
  const { mode } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const [isSubmitting, setIsSubmitting] = useState(false);

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
  async function onSubmit(values: z.infer<typeof questionSchema>) {
    setIsSubmitting(true);

    // make asychronous call to api
    // contain all form data
    try {
      const result = await createQuestion({
        title: values.title,
        description: values.description,
        tags: values.tag,
        author: JSON.parse(mongoUserId),
        path: pathname,
      });

      console.log(result);
      // navigate to home page
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      await setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  }

  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (event.key === "Enter" && field.name === "tag") {
      event.preventDefault();

      const tagInput = event.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue) {
        if (tagValue.length > 15) {
          return form.setError("tag", {
            type: "required",
            message: "Must be less than 15 characters",
          });
        }
        if (!field.value.includes(tagValue as never)) {
          form.setValue("tag", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tag");
        }
      } else {
        form.trigger();
      }
    }
  };

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
              <FormControl className="mt-3.5">
                <MyEditor mode={mode} field={field} />
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
                <>
                  <Input
                    className="text-dark100_light900 background-light800_dark400 "
                    placeholder="Add tag..."
                    onKeyDown={(event) => {
                      handleInputKeyDown(event, field);
                    }}
                  />

                  {field.value.length > 0 && (
                    <div className="mt-2.5 flex shrink-0 gap-2.5">
                      {field.value.map((item: any) => (
                        <div
                          key={item}
                          onClick={() => {
                            form.setValue(
                              "tag",
                              field.value.filter((value) => value !== item)
                            );
                          }}
                        >
                          <RenderTag content={item} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
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
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === "edit" ? "Editing..." : "Submitting..."}</>
          ) : (
            <>{type === "edit" ? "Edit Question" : "Submit Question"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default QuestionForm;
