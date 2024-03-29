"use server"

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { DeletedList } from "./schema";
import { redirect } from "next/navigation";
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

  let list;

  try {
    list = await db.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        }
      },
    });

    await createAuditLog({
      action: ACTION.DELETE,
      entityType: ENTITY_TYPE.LIST,
      entityTitle: list.title,
      entityId: list.id,
    });

  } catch(error) {
    return {
      error: "Hubo un error al eliminar la lista.",
    };
  }
  
  revalidatePath(`organization/${boardId}`);
  return {data: list}
}

export const deleteList = createSafeAction(DeletedList, handler);