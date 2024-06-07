'use client';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';
import Logo from './Logo';
import LangToggle from './LangToggle';
import { useLoginWindowContext } from '@/contexts/LoginWindowContext';

export default function Header() {
    const t = useTranslations('Navigation');
    const { isOpen, setIsOpen } = useLoginWindowContext();

    return (
        <header>
            <nav className='limit-width p-2 flex justify-between'>
                <div className='flex gap-2'>
                    <Link href='/' className='flex gap-2'>
                        <Logo className='size-10' />
                        <h4 className='text-xl font-bold logo-text'>Sell Stuff</h4>
                    </Link>
                </div>
                <ul className='flex'>
                    <li>
                        <button onClick={() => setIsOpen(true)}>{t('login')}</button>
                    </li>
                    <li>
                        <Link href={'/contact'}>{t('contact')}</Link>
                    </li>
                    <li>
                        <Link href={'/'}></Link>
                    </li>
                </ul>
            </nav>
            <LangToggle />
        </header>
    );
}
