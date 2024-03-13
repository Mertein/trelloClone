"use server"

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { UpdateList } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";


const handler = async (data: InputType) : Promise<ReturnType> => {
  const { orgId, userId } = auth();

  if(!orgId || !userId) {
    return {
      error: "No autorizado",
    }
  };

  const {title, id, boardId} = data;

  let UpdateList;

  try {
    UpdateList = await db.list.update({
      where: {
        boardId,
        id,
        board: {
          orgId,
        }
      },
      data: {
        title,
      }
    })
  } catch(error) {
    return {
      error: "Hubo un error al actualizar el tablero.",
    };
  };

  await createAuditLog({
    action: ACTION.UPDATE,
    entityType: ENTITY_TYPE.LIST,
    entityTitle: UpdateList.title,
    entityId: UpdateList.id,
  });
  
  revalidatePath(`board/${boardId}`);
  return {data: UpdateList};
}

export const updateList = createSafeAction(UpdateList, handler);