"use client";
import { toast } from "sonner";
import { ElementRef, useRef, useState } from "react";
import { FormInputIcon, Layout } from "lucide-react";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { CardWithList } from "@/types";
import { useAction } from "@/hooks/use-action";
import { Skeleton } from "@/components/ui/skeleton";
import { FormInput } from "@/components/form/form-input";
import { updateCard } from "@/actions/update-card";
interface HeaderProps {
  data: CardWithList;
}

export const Header = ({
  data,
} : HeaderProps) => {

  const queryClient = useQueryClient();
  const params = useParams();
  const [title, setTitle] = useState(data.title);
  
  const {execute} = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id]
      });

      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id]
      })
      
      toast.success(`Renombrado a "${data.title}"`);
      setTitle(data.title);
    },

    onError: (error) => {
      toast.error(error);
    }
  
  })

  const inputRef = useRef<ElementRef<"input">>(null);
  
  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const boardId = params.boardId as string;

    if(title === data.title) {
      return;
    }

    execute({
      title, 
      boardId,
      id: data.id,
    });
  }
 

  return (
    <div>
      <Layout  />
      <div>
        <form action={onSubmit}>
          <FormInput
            id='title'
            ref={inputRef}
            onBlur={onBlur}
            defaultValue={title}
            className=""
          />
        </form>
        <p className="">
          En Lista <span className="">{data.list.title}</span>
        </p>
      </div>
    </div>
  )
}

Header.Skeleton = () => {
  return (
    <div>
      <Skeleton className="" />
      <div>
        <Skeleton className="" />
        <Skeleton className="" />
      </div>
    </div>
  );
};