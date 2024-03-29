"use server"

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { DeleteCard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";


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
   card = await db.card.delete({
    where: {
      id,
      list: {
        board: {
          orgId,
        },
      },
    },
   });
   await createAuditLog({
    action: ACTION.DELETE,
    entityType: ENTITY_TYPE.CARD,
    entityTitle: card.title,
    entityId: card.id,
  });
  } catch(error) {
    return {
      error: "Hubo un error al Eliminar.",
    };
  }
  
  revalidatePath(`board/${boardId}`);
  return {data: card};
}

export const deleteCard= createSafeAction(DeleteCard, handler);