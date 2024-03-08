'use client';

import { FormSubmit } from '@/components/form/form-submit';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverTrigger,
    PopoverClose,
    PopoverContent,
} from '@/components/ui/popover';
import {} from '@/components/ui/separator';
import { List } from '@prisma/client';
import { MoreHorizontal, X } from 'lucide-react';
import { useAction } from "@/hooks/use-action";
import { deleteList } from '@/actions/delete-list';
import { toast } from 'sonner';
import { copyList } from '@/actions/copy-list';


interface ListOptionsProps {
    data: List;
    onAddCard: () => void;
}


export const ListOptions = ({
    data,
    onAddCard,
} : ListOptionsProps) => {
    const {execute: deleteExecute, fieldErrors: deleteFieldErrors} = useAction(deleteList, {
        onSuccess: () => {
          toast.success(`Lista ${data.title} eliminada con éxito`);
        },
        onError(error) {
          toast.error(error);
        },
    })

    const {execute: copyExecute, fieldErrors: copyFieldErrors} = useAction(copyList, {
      onSuccess: () => {
        toast.success(`Lista ${data.title} copiada con éxito`);
      },
      onError(error) {
        toast.error(error);
      },
  })


    const onDelete = (formData: FormData) => {
      const id = formData.get('id') as string;
      const boardId = formData.get('boardId') as string;
      deleteExecute({id, boardId});

    }
    const onCopy = (formData: FormData) => {
      const id = formData.get('id') as string;
      const boardId = formData.get('boardId') as string;
      copyExecute({id, boardId});
    }

    return (
        <Popover>
            <PopoverTrigger asChild ref={()=>{}} >
                <Button variant='ghost' className='w-auto h-auto p-2'>
                   <MoreHorizontal className='h-4 w-4'/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className='px-0 pt-3 pb-3'
                side='bottom'
                align='start'
            >
                <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
                    Acciones de la Lista
                </div>
                <PopoverClose>
                    <Button
                    variant='ghost'
                    className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
                    >
                        <X className='h-4 w-4'/>
                    </Button>
                </PopoverClose>
                <Button
                variant='ghost'
                className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
                size='sm'
                onClick={onAddCard}
                >
                    Agregar Tarjeta...
                </Button>
                <form action={onCopy}>
                    <input hidden name='id' id='id'
                    value={data.id}
                    />
                    <input hidden name='boardId' id='boardId'
                    value={data.boardId}
                    />
                    <FormSubmit
                      variant='ghost'
                      className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    >
                      Copiar Lista...
                    </FormSubmit>
                </form>
                <form action={onDelete}>
                <input hidden name='id' id='id'
                    value={data.id}
                    />
                    <input hidden name='boardId' id='boardId'
                    value={data.boardId}
                    />
                     <FormSubmit
                      variant='ghost'
                      className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    >
                      Eliminar esta lista..
                    </FormSubmit>
                
                </form>
            </PopoverContent>
        </Popover>

    )
}