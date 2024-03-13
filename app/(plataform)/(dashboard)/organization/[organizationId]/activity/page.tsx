import { Separator } from "@/components/ui/separator"
import { Suspense } from "react"
import {ActivityList} from "./_components/activity-list";
import { Info } from "../_components/info";


const ActivityPage = () => {
  // const isPro = await checkSubscription();
  return (
    <div className="w-full">
      <Info />
      <Separator className="my-2" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList/>
      </Suspense>
    </div>
  );
};

export default ActivityPage;