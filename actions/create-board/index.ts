"use server";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { hasAvailableCount, incrementAvailableCount } from "@/lib/org-limit";

const handler = async (data: InputType): Promise<ReturnType> => {
  const {userId, orgId} = auth();
  
  if(!userId || !orgId) {
    return {
      error: "Unauthorized"
    };
  };

  const canCreate = await hasAvailableCount();
  if(!canCreate) {
    return {error: "Alcanzaste el límite de tableros. Actualiza tu plan para crear más tableros."};
  }


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

    await incrementAvailableCount();

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



