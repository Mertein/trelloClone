'use client';

import {
    Popover, 
    PopoverContent,
    PopoverTrigger,
    PopoverClose
} from '@/components/ui/popover';
import { useAction } from '@/hooks/use-action';

import { FormInput } from './form-input';
import { FormSubmit } from './form-submit';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { createBoard } from "@/actions/create-board/index";


interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number; 
}

export const FormPopover= ({
  children,
  side = 'bottom',
  align,
  sideOffset = 0
} : FormPopoverProps ) => {

  const {execute,fieldErrors} = useAction(createBoard, {
    onSuccess: (data) =>  {
      console.log({data});
    },
    onError(error) {
      console.log({error});
    },
  })

  const onSubmit = (formData: FormData)  => {
    const title = formData.get('title') as string;
    execute({ title, image: 'image'});

  } 

    return ( 
      <Popover>
        <PopoverTrigger asChild>
          {children}
        </PopoverTrigger>
          <PopoverContent
            align='center'
            className='w-80 pt-3'
            side={side}
            sideOffset={sideOffset}
          >
            <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
              CreateBoard
            </div>
            <PopoverClose asChild>
              <Button 
                variant='ghost' type='button' size='sm'
                className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-500'
              >
                <X className='h-4 w-4'/>
              </Button>
            </PopoverClose>
            <form  action={onSubmit}>
              <div className='space-y-4'>
                <div className='space-y-4'>
                  <FormInput id='title' label='Titulo del Tablero' type='text' errors={fieldErrors} />
                </div>
                <FormSubmit className='w-full'>
                  Crear Tablero
                </FormSubmit>
              </div>
            </form>
          </PopoverContent>
      </Popover>
     );
}
 
