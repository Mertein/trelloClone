"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateCard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const {userId, orgId} = auth();
  
  if(!userId || !orgId) {
    return {
      error: "Unauthorized"
    };
  };

  const {title, boardId, listId} = data;

  let card;
  let list;
  try {

    list = await db.list.findUnique({
      where:{
        id: listId,
        board: {
          orgId,
        }
      }
    })
    
    if(!list) { 
      return {error: "No se encontró la lista"}
    }

    const lastCard = await db.card.findFirst({
      where:{
        listId,
      },
      orderBy: {
        order: 'desc'
      },
      select:{
        order: true,
      }
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;
    
    card = await db.card.create({
      data: {
        title,
        listId,
        order: newOrder,
      },
    });

    await createAuditLog({
      action: ACTION.CREATE,
      entityType: ENTITY_TYPE.CARD,
      entityTitle: card.title,
      entityId: card.id,
  });

    
  } catch (error) {
    return {
      error: "Fallo: No se pudo crear la tarjeta"
    }
  }

  revalidatePath(`/board/${boardId}`);
  return {data: card};
}

export const createCard = createSafeAction(CreateCard, handler);



