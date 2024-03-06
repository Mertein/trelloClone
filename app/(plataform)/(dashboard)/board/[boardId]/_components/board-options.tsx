"use client";
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose
} from '@/components/ui/popover';
import {X, MoreHorizontal} from 'lucide-react'
import { deleteBoard } from "@/actions/delete-board";
import { useAction } from "@/hooks/use-action";
import { toast } from 'sonner';

 
interface BoardOptionsProps {
  id: string,
}

export const BoardOptions = ({id} : BoardOptionsProps) => {

  const {execute, isLoading} = useAction(deleteBoard, {
    onError(error) {
      toast.success(error);
    },
  })

  const onDelete = () => {
    execute({id});
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='h-auto w-auto p-2 ' variant='transparent'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='px-0 pt-3 pb-3'
        side='bottom'
        align='start'
      >
        <div className='text-sm text-center font-medium text-neutral-600 pb-4'>
          Acciones del Tablero
        </div>
        <PopoverClose asChild>
          <Button variant='ghost' className='top-2 right-2 absolute h-auto w-auto p-2 text-neutral-600' >
              <X className='h-4 w-4'/>
          </Button> 
        </PopoverClose>
        <Button 
          className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
          variant='ghost'
          onClick={onDelete}
          disabled={isLoading}

        >
          Eliminar Tablero
        </Button> 
      </PopoverContent>
     

    </Popover>
  )

}