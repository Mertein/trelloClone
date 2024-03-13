"use server"

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { CopyCard } from "./schema";


const handler = async (data: InputType) : Promise<ReturnType> => {
  const { orgId, userId } = auth();

  if(!orgId || !userId) {
    return {
      error: "No autorizado",
    }
  };

  const {id, boardId} = data;

  let card;

  try {
   const cardToCopy = await db.card.findUnique({
    where: {
      id,
      list: {
        board: {
          orgId,
        },
      },
    },
   })

   if(!cardToCopy) {
    return {error: 'Tarjeta no encontrada!'}
   }

   const lastCard = await db.card.findFirst({
    where: {
      listId: cardToCopy.listId,
    },
    orderBy: { order: 'desc'},
    select: { order: true },
   });

   const newOrder = lastCard ? lastCard.order + 1 : 1;

   card = await db.card.create({
    data:{
      title: `${cardToCopy.title} (Copia)`,
      description: cardToCopy.description,
      order: newOrder,
      listId: cardToCopy.listId,
    },
   })
  } catch(error) {
    return {
      error: "Hubo un error al actualizar el tablero.",
    };
  }
  
  revalidatePath(`board/${boardId}`);
  return {data: card};
}

export const copyCard= createSafeAction(CopyCard, handler);