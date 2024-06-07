import React from 'react';
import About from './About';
import { useTranslations } from 'next-intl';
export default function Page() {
    // const t = useTranslations('');
    return (
        <div>
            {/* <h1>{t}</h1> */}
            <About />
        </div>
    );
}
