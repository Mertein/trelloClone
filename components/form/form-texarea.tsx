import { KeyboardEventHandler, forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";
import { useFormStatus } from "react-dom";



interface FormTextareaProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>
  className?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
  defaultValue?: string;
}


export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(({
  id,
  label,
  placeholder,
  disabled,
  required,
  errors,
  className,
  onBlur,
  onClick,
  onKeyDown,
  defaultValue,
}, ref) => {
  const {pending} = useFormStatus();

  return (
    <div className="">
      <div>
        {label ? (
          <Label
            htmlFor={id}
            className=""
          >
            {label}
          </Label>
        ) : null}
        <Textarea
          onKeyDown={onKeyDown}
          onClick={onClick}
          onBlur={onBlur}
          ref={ref}
          required={required}
          placeholder={placeholder}
          name={id}
          id={id}
          disabled={disabled || pending}
          defaultValue={defaultValue}
          aria-describedby={`${id}-error`}
          className={cn(
            'resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0  outline-none shadow-sm',
            className,
          )}
        />
      </div>
      <FormErrors id={id} errors={errors} />
    </div>
  )

})

FormTextarea.displayName = 'FormTextarea'