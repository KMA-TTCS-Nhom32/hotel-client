import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { AppTranslationFunction } from '@/lib/types/i18n';

type BaseProps<TFieldValues extends FieldValues> = {
  className?: string;
  control?: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string | ReactNode;
  isLoading?: boolean;
  description?: string | ReactNode;
  isTextArea?: boolean;
  t?: AppTranslationFunction;
};

type InputTextProps<TFieldValues extends FieldValues> = BaseProps<TFieldValues> &
  (BaseProps<TFieldValues>['isTextArea'] extends true
    ? Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'form'>
    : Omit<InputHTMLAttributes<HTMLInputElement>, 'form'>);

function InputText<TFieldValues extends FieldValues>({
  className,
  control,
  name,
  label,
  isLoading,
  description,
  isTextArea,
  onChange,
  disabled,
  t,
  ...props
}: InputTextProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {isTextArea ? (
              <Textarea
                {...field}
                disabled={isLoading || disabled}
                className={cn(className, error && 'border-destructive')}
                {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
              />
            ) : (
              <Input
                {...field}
                disabled={isLoading || disabled}
                className={cn(className, error && 'border-destructive')}
                onChange={(e) => {
                  field.onChange(e);
                  onChange?.(e);
                }}
                {...(props as InputHTMLAttributes<HTMLInputElement>)}
              />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage t={t} />
        </FormItem>
      )}
    />
  );
}

export default InputText;
