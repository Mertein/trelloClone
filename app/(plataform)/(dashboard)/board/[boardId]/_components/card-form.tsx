"use client";

import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-texarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react";
import {useAction} from '@/hooks/use-action';
import { createCard } from "@/actions/create-card";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useOnClickOutside, useEventListener } from "usehooks-ts";
interface CardFormProps {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;

}


export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({
  listId,
  enableEditing,
  disableEditing,
  isEditing
}, ref) => {

  const params = useParams();
  const {execute, fieldErrors} = useAction(createCard, {
    onSuccess: (data) => {
      toast.success(`Tarjeta ${data.title} creada con éxito`);
      formRef.current?.reset();
    },
    onError: (error) => {
      toast.error(error);
    } 
  })

  const formRef = useRef<ElementRef<'form'>>(null);
  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const listId = formData.get('listId') as string;
    const boardId = params.boardId as string;
    execute({title, listId, boardId});
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if(e.key === "Escape") {
      disableEditing();
    }
  }

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(formRef, disableEditing)

  const onTextareakeyDown : KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if(e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    };
  };
  

  if(isEditing) {
    return(
      <form
        ref={formRef}
        action={onSubmit}
        className="m-1 py-0.5 px-1 space-y-4"
      >
        <FormTextarea 
          id="title"
          onKeyDown={onTextareakeyDown}
          placeholder="Título de la tarjeta"
          ref={ref}
          errors={fieldErrors}
        />
        <input
        hidden
        id="listId"
        value={listId}
        name="listId"
        />
        <div className="flex items-center gap-x-1">
          <FormSubmit>
            Agregar tarjeta
          </FormSubmit>
          <Button variant='ghost'
            size='sm'
            onClick={disableEditing}
          >
            <X className="h-5 w-5"/>
          </Button>
        </div>

      </form>
    
    )
  }

  return (
    <div className="pt-2 px-2">
      <Button
        disabled={isEditing}
        size='sm'
        variant='ghost'
        onClick={enableEditing}
        className="h-auto w-full justify-start text-muted-foreground text-sm py-1.5 px-2 "
      >
        <Plus className="h-4 w-4 mr-2 "/>
        Agregar tarjeta
      </Button>
    </div>
  );
});

CardForm.displayName = "CardForm";