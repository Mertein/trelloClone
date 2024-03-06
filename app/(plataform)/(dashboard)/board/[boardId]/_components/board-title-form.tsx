'use client';
import { updateBoard } from "@/actions/updated-board";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface BoardTitleFormProps {
  data: Board;
}

export const BoardTitleForm = ({
  data,
} : BoardTitleFormProps ) => {

  const { execute } = useAction(updateBoard, {
    onSuccess(data) {
      toast.success(`Tablero "${data.title}" actualizado!` )
      setTitle(data.title);
      disableEditing();
    }, 
    onError(error) {
      toast.error(error);
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data?.title);

  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const disableEditing = () => {
    setIsEditing(false);
  }

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    })
  }

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    execute({title, id: data.id});

  }

  const onBlur = () => {
    formRef.current?.requestSubmit();
  }
  

  if(isEditing) {
    return (
      <form action={onSubmit} className="flex items-center gap-x-2  " ref={formRef}>
        <FormInput id='title' ref={inputRef} onBlur={onBlur} defaultValue={title} className="text-lg font-bold px-[7px] py-1 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none " />

      </form>
    )
  }


  return (
    <Button
      variant='transparent'
      className="font-bold text-lg px-2 p-1  "
      onClick={enableEditing}
    >
      {title}
    </Button>
  )


}