import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import {ENTITY_TYPE} from "@prisma/client";

import {db} from "@/lib/db";

export async function GET (
  req: Request,
  { params } : { params: { cardId: string } }
) {
  try {
    const {orgId, userId} = auth();
    
    if(!userId || !orgId) {
      return new NextResponse("No autorizado", { status: 401 } );
    };

    const auditLogs = await db.auditLog.findMany({
      where: {
        orgId,
        entityId: params.cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    return NextResponse.json(auditLogs);
  } catch (error) {
    return new NextResponse("Error interno", { status: 500 });
  }
}