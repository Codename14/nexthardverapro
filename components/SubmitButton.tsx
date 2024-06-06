'use client';
import { useFormStatus } from 'react-dom';
import { ReactNode, type ComponentProps } from 'react';

type Props = ComponentProps<'button'> & {
    pendingText?: ReactNode | string;
};

export function SubmitButton({ children, pendingText, ...props }: Props) {
    const { pending, action } = useFormStatus();

    return (
        <button {...props} type='submit' aria-disabled={pending}>
            {pending ? pendingText : children}
        </button>
    );
}
