import { z } from "zod";

export const questionSchema = z.object({
  title: z
    .string()
    .min(4, {
      message: "Topic must be at least 3 characters.",
    })
    .max(64, {
      message: "Topic must not be more than 64 characters.",
    }),

  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),

  tag: z
    .array(
      z
        .string()
        .min(3, {
          message: "Tag must be at least 3 characters.",
        })
        .max(32, { message: "Tag must not be more than 32 characters." })
    )
    .min(1, {
      message: "You must select at least one tag.",
    })
    .max(5, {
      message: "You can select up to 5 tags.",
    }),
});
