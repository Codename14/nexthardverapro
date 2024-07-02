import { useTranslations } from 'next-intl';
import React from 'react';
import ThemeToggle from './header/ThemeToggle';
import Link from 'next/link';

export default function Footer() {
    const t = useTranslations('Footer');
    return (
        <>
            <footer>
                <div className='limit-width'>
                    <small className='block font-semibold mb-2'>{t('project_details')}</small>
                    <small>Sell Stuff &copy; {t('rights')} 2024.</small>
                    <ThemeToggle />
                    <p className='mt-2 mx-auto text-center'>
                        {t('madeby')}{' '}
                        <Link href='https://www.alexbanai.cc/' className='font-semibold'>
                            Alex Banai
                        </Link>
                    </p>
                </div>
            </footer>
        </>
    );
}
