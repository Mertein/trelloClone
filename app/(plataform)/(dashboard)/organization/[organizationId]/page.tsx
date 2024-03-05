import { Separator } from "@/components/ui/separator";
import { Info } from "./_components/info";
import { BoardList } from "./_components/board-list";
import { Suspense } from "react";

const OrganizationIdPage = async () => {
  return ( 
    <div className="flex flex-col space-y-4">
      <Info />
      <Separator className="my-4"/>
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton/>}>
          <BoardList />
        </Suspense>
      </div>
    </div>
   );
}
 
export default OrganizationIdPage;