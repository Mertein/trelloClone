import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  req: NextRequest,
  { params } : { params: { cardId: string } }
) {
  try {
    const  { orgId, userId } = auth();

    if(!orgId || !userId) {
      return new NextResponse("No Autorizado", { status: 401});
    };

    const card = await db.card.findUnique({
      where: {
        id: params.cardId,
        list: {
          board: {
            orgId,
          },
        },
      },
      include: {
        list: {
          select: {
            title: true,
          },
        },
      },
    });

    return NextResponse.json(card);
    
  } catch (error) {
    return new NextResponse("Error Interno", { status: 500 });
  }
}