"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateCardOrder } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { boardId, items} = data;
  let updateCards;

  try {
    const transaction = items.map((card) => 
      db.card.update({
        where: {
          id: card.id,
          list: {
            board:{
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      }),
    );
    updateCards = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Error al ordenar."
    }
  }

  revalidatePath(`/board/${boardId}`);
  return { data: updateCards };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);