'use client';
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react";
import { ListWrapper } from "./list-wrapper";
import { ElementRef, useRef, useState } from "react";
import { FormInput } from "@/components/form/form-input";
import { useParams, useRouter } from "next/navigation";
import { FormSubmit } from "@/components/form/form-submit";
import { useAction } from '@/hooks/use-action';
import { createList } from "@/actions/create-list";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";

export const ListForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();
  const router = useRouter();
  const {execute, fieldErrors} = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`Lista ${data.title} creada.! `);
      setIsEditing(false);
      router.refresh();
    },
    onError(error) {
      toast.error(error)
    },
  });


  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const disableEditing = () => {
    setIsEditing(false)
  }

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    })
  }

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const boardId = formData.get('boardId') as string;

    execute({title, boardId});
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if(e.key === 'Escape') {
      disableEditing();
    }
  }

  useEventListener('keydown', onKeyDown)

    if(isEditing) {
    return(
      <ListWrapper>
        <form
        ref={formRef}
        className="space-y-4 p-3 w-full bg-white rounded-md"
        action={onSubmit}
        >
          <FormInput
            id="title"
            type="text"
            errors={fieldErrors}
            ref={inputRef}
            placeholder="Ingrese un titulo..."
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition" 
            label="Título de la lista" 
          />
          <input
          hidden
          value={params.boardId}
          name='boardId'
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit>
              Agregar Lista
            </FormSubmit>
            <Button
              onClick={disableEditing}
              size='sm'
              variant='ghost'
            >
              <X className="h-5 w-5"/>
            </Button>
          </div>
        </form>
      </ListWrapper>
    )
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
      >
        <Plus className="w-4 h-4 mr-2"/>
        Agregar una Lista
      </button>
    </ListWrapper>
  ) 
}