"use server"

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { DeletedBoard } from "./schema";
import { redirect } from "next/navigation";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { createAuditLog } from "@/lib/create-audit-log";


const handler = async (data: InputType) : Promise<ReturnType> => {
  const { orgId, userId } = auth();

  if(!orgId || !userId) {
    return {
      error: "No autorizado",
    }
  };

  const {id} = data;

  let board;

  try {
    board = await db.board.delete({
      where: {
        orgId,
        id,
      },
    });

    await createAuditLog({
      action: ACTION.DELETE,
      entityType: ENTITY_TYPE.BOARD,
      entityTitle: board.title,
      entityId: board.id,
    });
    
  } catch(error) {
    return {
      error: "Hubo un error al eliminar el tablero.",
    };
  }
  
  revalidatePath(`organization/${orgId}`);
  redirect(`/organization/${orgId}`);
  
}

export const deleteBoard = createSafeAction(DeletedBoard, handler);