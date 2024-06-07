'use client';
import { type ComponentProps } from 'react';
import { IoIosInformationCircle } from 'react-icons/io';

type Props = ComponentProps<'div'> & {
    // pendingText?: string;
};

export default function HelperText({ children, ...props }: Props) {
    return (
        <>
            <div {...props}>
                <IoIosInformationCircle size={25} />
                <p className='text--helper text--light '> {children}</p>
            </div>
        </>
    );
}
