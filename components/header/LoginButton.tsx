'use client';
import { useLoginWindowContext } from '@/contexts/LoginWindowContext';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function LoginButton({ children, className }: { children: React.ReactNode; className: string }) {
    const { isOpen, setIsOpen } = useLoginWindowContext();

    return (
        <>
            <button className={`${className}`} onClick={() => setIsOpen(true)}>
                {children}
            </button>
        </>
    );
}
