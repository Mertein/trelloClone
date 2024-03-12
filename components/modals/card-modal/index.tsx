"use client"
import { Header } from "./header";
import { Description } from './description';


import {Dialog, DialogClose, DialogContent} from '@/components/ui/dialog'
import { useCardModal } from "@/hooks/use-card-modal";

import { useQuery } from "@tanstack/react-query";
import { CardWithList } from "@/types";
import { fetcher } from "@/lib/fetcher";


export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);


  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
        {!cardData 
        ? <Header.Skeleton/>
        : <Header data={cardData}/>
        }
        <div>
          <div>
            <div>

            </div>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  )
}