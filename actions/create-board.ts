"use server";
import {db} from "@/lib/db";
import { revalidatePath } from "next/cache";
import * as z from 'zod';

const CreateBoardSchema = z.object({
  title: z.string(),
})

export async function create(formData: FormData) {
  const {title} = CreateBoardSchema.parse({
    title: formData.get("title"),
  })
  console.log(title)
  await db.board.create({
    data: {
      title,
    }
  })

  revalidatePath('/organization/[organizationId]')
}