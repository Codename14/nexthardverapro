'use client';
import { useFormStatus } from 'react-dom';
import { ReactNode, type ComponentProps } from 'react';

type Props = ComponentProps<'button'> & {
    pendingText?: ReactNode | string;
    disabled?: boolean;
};

export function SubmitButton({ children, disabled, pendingText, ...props }: Props) {
    const { pending, action } = useFormStatus();

    return (
        <button {...props} type='submit' aria-disabled={pending} disabled={pending || disabled}>
            {pending ? pendingText : children}
        </button>
    );
}
