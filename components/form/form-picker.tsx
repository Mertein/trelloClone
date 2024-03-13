"use client";
import {unsplash} from '@/lib/unsplash';
import { useEffect, useState } from 'react';
import {Check, Loader2} from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';
import {defaultImages} from '@/constants/images';
import Image from 'next/image';
import Link from 'next/link';
import { FormErrors } from './form-errors';
import { Input } from '@/components/ui/input';

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>,
};


export const FormPicker = ({
  id,
  errors,
} : FormPickerProps ) => {
  const {pending} = useFormStatus();
  const [images, setImages] = useState<Array<Record<string , any>>>(defaultImages);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        })
        if(result && result.response) {
          const newImages = result.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.error('Fallo en la obtención de imágenes de Unsplash')
        }
       
      } catch (error) {
        console.log(error)
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [])

  if(isLoading) {
    return (
      <div className='justify-center items-center flex p-6'>
        <Loader2 className='h-6 w-6 text-sky-700 animate-spin' />
      </div>
    )
  }
    
  return (
    <div className='relative '>
      <div className='grid grid-cols-3 gap-2 mb-2'>
        {images.map((image) => (
          <div className={cn(
            "relative aspect-video cursor-pointer group hover:opacity-70 transition bg-muted",
             pending && "opacity-50 hover:opacity-50 cursor-auto"
            )} key={image.id}
            onClick={() => {
              if(pending) return;
              setSelectedImageId(image.id)}
            }
          >
            <Input
              type='radio'
              id={id}
              name={id}
              className='hidden'
              checked={selectedImageId === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            
            <Image 
              src={image.urls.thumb}
              alt='Unplash imagen'
              fill
              className='object-cover rounded-sm'
            />
            {selectedImageId === image.id && (
              <div className='absolute flex items-center justify-center inset-y-0 w-full h-full bg-black/30'>
                <Check className='h-4 w-4 text-white'/>

              </div> 
            )}
            <Link
              href={image.links.html}
              target="_blank"
              className='opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50'  

            >
              {image.user.name}
            </Link>
            

          </div>
        ))}
      </div>
      <FormErrors id='image' errors={errors} />
    </div>
  )
}