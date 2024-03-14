import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import { BoardNavbar } from "./_components/board-navbar";


interface BoardIdProps {
  children: React.ReactNode; 
  params: {boardId: string;};
}

export async function generateMetadata({ 
  params
 }: {
  params: { boardId: string; };
 }) {
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: "Tablero",
    };
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId
    }
  });

  return {
    title: board?.title || "Tablero",
  };
}

const BoardIdLayout = async ({
  children,
  params,
} : BoardIdProps) => {
  const { orgId } = auth();

  if(!orgId) {
    return redirect('select/org')
  }

  const board = await db.board.findUnique({
    where: {
      orgId,
      id: params.boardId,
    }
  });

  if(!board) {
    notFound();
  }
  
  return (
    <div
      style={{backgroundImage: `url(${board.imageFullUrl})`}}
      className="relative h-full bg-no-repeat bg-cover bg-center"
    >
      <BoardNavbar data={board}/>
      <main className="relative pt-28 h-full">
        {children}
      </main>
    </div>
  )
}

export default BoardIdLayout;

