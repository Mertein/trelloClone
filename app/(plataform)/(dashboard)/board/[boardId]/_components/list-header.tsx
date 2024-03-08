"use client";
import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { ListWithCards } from "@/types"
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import { ListOptions } from "./list-options";


interface HeaderListProps {
  data: ListWithCards;
  onAddCard: () => void;
}



export const ListHeader = ({
  data,
  onAddCard,
} : HeaderListProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    })
  }
  const {execute, fieldErrors} = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Lista renombrado a ${data.title}!`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  const inputRef = useRef<ElementRef<'input'>>(null);
  const formRef = useRef<ElementRef<'form'>>(null);

  const disableEditing = () => {
    setIsEditing(false);
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if(e.key === 'Escape') {
      disableEditing();
      formRef.current?.requestSubmit();
    }
  }

  const onBlur = () => {
    formRef.current?.requestSubmit();
  }
  
  useEventListener('keydown', onKeyDown); 

  const handleSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const id = formData.get('id') as string;
    const boardId = formData.get('boardId') as string;
    
    if(title === data.title) {
      return disableEditing();
    }
    execute({title, id, boardId });

  }

  if(isEditing) {
    return (
      <form
        className="bg-white rounded-md p-3 space-y-4"
        action={handleSubmit}
        ref={formRef}
      >
        <input hidden id='id' name='id' value={data.id}/>
        <input hidden id='boardId' name='boardId' value={data.boardId}/>
        <FormInput
          id="title"
          ref={inputRef}
          errors={fieldErrors}
          onBlur={onBlur}
          defaultValue={title}
          placeholder="Ingrese un titulo..."
          className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
        />
        <button hidden type='submit'/>
      </form>
    )
  }

  return(
  <div className="flex pt-2 px-2 text-sm font-semibold justify-between items-start gap-x-2">
    <div 
      className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
      onClick={enableEditing}
    >
      {title}
    </div>
    <ListOptions
      onAddCard={onAddCard}
      data={data}
    />
  </div>
  )
}