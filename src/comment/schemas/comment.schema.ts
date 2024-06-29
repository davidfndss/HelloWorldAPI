import { z } from 'zod'

export const CommentSchema = z
  .object({
    body: z
      .string()
      .min(3, { message: "Comment is too short" })
})