"use client";
import {useFormStatus} from 'react-dom';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';

interface FormSubmitProps  {
  children?: React.ReactNode,
  className?: string,
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary";
  disabled?: boolean,
}

export const FormSubmit = ({
  children,
  className,
  variant = 'primary',
  disabled,
} : FormSubmitProps) => {
  const {pending} = useFormStatus();
  return (
    <Button type='submit' size='sm' className={cn(className)} variant={variant} disabled={pending || disabled}>
      {children}
    </Button>
  )
}