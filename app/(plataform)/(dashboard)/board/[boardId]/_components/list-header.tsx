"use client";
import { FormInput } from "@/components/form/form-input";
import { ListWithCards } from "@/types"
import { ElementRef, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";


interface HeaderListProps {
  data: ListWithCards;
}



export const ListHeader = ({
  data
} : HeaderListProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    })
  }

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
    console.log({title})
  }

  if(isEditing) {
    return (
      <form
        className="bg-white rounded-md p-3 space-y-4"
        action={() => {}}
        ref={formRef}
      >
        <input hidden id='id' name='id' value={data.id}/>
        <input hidden id='boardId' name='boardId' value={data.boardId}/>
        <FormInput
          id="title"
          ref={inputRef}
          onBlur={onBlur}
          placeholder="Ingrese un titulo..."
          className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
        />
        <button hidden type='submit'/>



      </form>
    )
  }

  return(
  <div className="pt-2 px-2 text-sm font-semibold justify-between items-start gap-x-2">
    <div 
      className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
      onClick={enableEditing}
    >
      {data.title}
    </div>
  </div>
  )
}