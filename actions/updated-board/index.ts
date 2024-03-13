"use server"

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { UpdatedBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";


const handler = async (data: InputType) : Promise<ReturnType> => {
  const { orgId, userId } = auth();

  if(!orgId || !userId) {
    return {
      error: "No autorizado",
    }
  };

  const {title, id} = data;

  let UpdateBoard;

  try {
    UpdateBoard = await db.board.update({
      where: {
        orgId,
        id,
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
    entityType: ENTITY_TYPE.BOARD,
    entityTitle: UpdateBoard.title,
    entityId: UpdateBoard.id,
  });
  
  revalidatePath(`board/${data.id}`);
  return {data: UpdateBoard};
}

export const updateBoard = createSafeAction(UpdatedBoard, handler);