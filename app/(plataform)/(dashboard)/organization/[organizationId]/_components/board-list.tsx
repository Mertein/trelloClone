import { HelpCircle, User2 } from "lucide-react"
import {db} from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import OrgaizationIdLayout from "../layout";
import { Hint } from "@/components/hint";
import { FormPopover } from "@/components/form/form-popover";
export const BoardList = async () => {
    const {orgId, organization} = auth();

  const boards = await db.board.findMany();

  console.log(boards)
  return (
    <div className="space-y-2">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your Boards
      </div>
      <div  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
      {/* {boards?.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
            style={{ backgroundImage: `url(${organization?.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <p className="relative font-semibold text-white">
              {board.title}
            </p>
          </Link>
        ))} */}

      </div>
    </div>
  )
}
