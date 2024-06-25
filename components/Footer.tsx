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
                    <small className='block'>
                        Ez egy hobby portfolió project, Felhívom a figyelmed, hogy az itt található tartalmak és funkciók éles használatra nem
                        alkalmasak. Kérlek, vedd figyelembe, hogy semmilyen felelősséget nem vállalok az esetlegesen felmerülő problémákért vagy
                        károkért.
                    </small>
                    <small>Sell Stuff &copy; {t('rights')} 2024.</small>
                </div>
            </footer>
        </>
    );
}
