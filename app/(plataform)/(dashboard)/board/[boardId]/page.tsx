import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";


interface BoardIdPageProps {
  params: {
    boardId: string;
  };
};


export default function BoardIdPage ({params} : BoardIdPageProps) {
  return(
    <div className="">
      BoardIdPage
    </div>
  )
}