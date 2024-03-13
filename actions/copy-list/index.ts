"use server"

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { CopyList } from "./schema";
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

  let CopyList;

  try {
    const listToCopy = await db.list.findFirst({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      }
    })

    if(!listToCopy) {
      return {error: 'La lista no existe'};
    }

    const lastList = await db.list.findFirst({
      where: {
        boardId,
      },
      orderBy: {
        order: 'desc'
      },
      select: {
        order: true,
      }
    })

    const newOrder = lastList ? lastList.order + 1 : 1;

    CopyList = await db.list.create({
      data: {
        boardId: listToCopy.boardId,
        title: `${listToCopy.title} - Copia`,
        order: newOrder,
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
    });

    await createAuditLog({
      action: ACTION.CREATE,
      entityType: ENTITY_TYPE.LIST,
      entityTitle: CopyList.title,
      entityId: CopyList.id,
  });
  } catch(error) {
    return {
      error: "Hubo un error al actualizar el tablero.",
    };
  }
  
  revalidatePath(`board/${boardId}`);
  return {data: CopyList};
}

export const copyList = createSafeAction(CopyList, handler);