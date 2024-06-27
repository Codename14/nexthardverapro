import { useTranslations } from 'next-intl';
import React from 'react';
import ThemeToggle from './header/ThemeToggle';

export default function Footer() {
    const t = useTranslations('Footer');
    return (
        <>
            <footer>
                <div className='limit-width'>
                    <ThemeToggle />
                    <small className='block'>{t('project_details')}</small>
                    <small>Sell Stuff &copy; {t('rights')} 2024.</small>
                </div>
            </footer>
        </>
    );
}
