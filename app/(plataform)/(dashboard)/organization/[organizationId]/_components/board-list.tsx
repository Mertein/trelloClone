import { HelpCircle, User2 } from "lucide-react"
import {db} from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import OrgaizationIdLayout from "../layout";
import { Hint } from "@/components/hint";
import { FormPopover } from "@/components/form/form-popover";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
export const BoardList = async () => {
  const {orgId} = auth();
  if(!orgId) {
    return redirect('/select-org');
  }
  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: 'desc',
    }
  })
  return (
    <div className="space-y-2">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Tus Tableros
      </div>
      <div  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link 
            href={`/board/${board.id}`}
            key={board.id}
            style={{backgroundImage: `url(${board.imageThumbUrl})`}}
            className="group aspect-video relative bg-center bg-sky-700 bg-no-repeat bg-cover rounded-sm h-full w-full p-2 overflow-hidden"
          >
              <div className="bg-black/30 inset-0 absolute group-hover:bg-black/40 transition "/>
              <p className="relative font-semibold text-white">{board.title}</p>
           </Link>
          ))}
          <FormPopover sideOffset={10} side='right' >
            <div role='button' className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1
            items-center justify-center hover:opacity-75 transition" >
                <p className="text-sm">Crea un nuevo Tablero</p>
                <span className="text-xs">5 restantes</span>
                <Hint sideOffset={40} description={`
                  La cuenta gratuita te permite crear hasta 5 tableros. Para tener tableros ilimitados, actualiza tu plan.
                  `} 
                  >
                  <HelpCircle className='h-[14px] w-[14px] bottom-2 absolute right-2 '/>
                </Hint>
            </div>
          </FormPopover>
      </div>
    </div>
  )
}

BoardList.Skeleton = function SkeletonBoardList () {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video rounded-sm w-full h-full p-8"/>
      <Skeleton className="aspect-video rounded-sm w-full h-full p-8"/>
      <Skeleton className="aspect-video rounded-sm w-full h-full p-8"/>
      <Skeleton className="aspect-video rounded-sm w-full h-full p-8"/>
      <Skeleton className="aspect-video rounded-sm w-full h-full p-8"/>
      <Skeleton className="aspect-video rounded-sm w-full h-full p-8"/>
      <Skeleton className="aspect-video rounded-sm w-full h-full p-8"/>
      <Skeleton className="aspect-video rounded-sm w-full h-full p-8"/>
    </div>
  )
}