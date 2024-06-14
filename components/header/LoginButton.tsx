'use client';
import { useLoginWindowContext } from '@/contexts/LoginWindowContext';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function LoginButton({ children }: { children: React.ReactNode }) {
    const { isOpen, setIsOpen } = useLoginWindowContext();

    return (
        <>
            <button onClick={() => setIsOpen(true)}>{children}</button>
        </>
    );
}
