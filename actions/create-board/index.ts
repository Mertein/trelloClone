"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const {userId, orgId} = auth();
  
  if(!userId || !orgId) {
    return {
      error: "Unauthorized"
    };
  };

  const {title, image} = data;

  const [
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageLinkHTML,
    imageUserName       
  ] = image.split("|");

  if(!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
    return {
      error: "Faltan datos. Hubo un error al crear el tablero."
    };
  }

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName,
        orgId,
      }
    });

    await createAuditLog({
      action: ACTION.CREATE,
      entityType: ENTITY_TYPE.BOARD,
      entityTitle: board.title,
      entityId: board.id,
  });
  
  } catch (error) {
    return {
      error: "Hubo un error al crear el tablero."
    };
  };

  revalidatePath(`/board/${board.id}`);
  return {data: board};
}

export const createBoard = createSafeAction(CreateBoard, handler);



