"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const {userId, orgId} = auth();
  
  if(!userId || !orgId) {
    return {
      error: "Unauthorized"
    };
  };

  const {title, boardId} = data;

  let list;

  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    });

    if (!board) {
      return {
        error: "Tablero no encontrado.",
      };
    };

    const lastList = await db.list.findFirst({
      where: {boardId: boardId},
      orderBy: {order: 'desc'},
      select: {order: true},
    })
    console.log({lastList});
    const newOrder = lastList ? lastList.order + 1 : 1;
    console.log({newOrder});

    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      }
    });
    
  } catch (error) {
    return {
      error: "Hubo un error al crear el tablero."
    }
  }

  revalidatePath(`/board/${boardId}`);
  return {data: list};
}

export const createList = createSafeAction(CreateList, handler);



