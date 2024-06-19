'use client';
import { useLoadingContext } from '@/contexts/LoadingContext';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useRef, useState, useTransition } from 'react';

export default function LangToggle() {
    const router = useRouter();
    const localActive = useLocale();
    const toggle = useRef(null);

    const [isPending, startTransition] = useTransition();
    const [selectedLanguage, setSelectedLanguage] = useState(localActive);

    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value;
        // setIsLoading(isPending); //háttér
        startTransition(() => {
            router.replace(`/${nextLocale}`);
        });
    };
    const handleLanguage = (lang: string) => {
        // console.log('handle', lang);
        const nextLocale = lang;
        // setIsLoading(isPending); //háttér
        startTransition(() => {
            router.replace(`/${nextLocale}`);
        });
    };
    const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = event.target.value;
        setSelectedLanguage(newLanguage);
        handleLanguage(newLanguage);
    };

    return (
        <>
            <div ref={toggle} className='languages flex'>
                <select value={selectedLanguage} onChange={handleLanguageChange} className='language-dropdow p-2  glass-card'>
                    <option value='en'>EN</option>
                    <option value='hu'>HU</option>
                    <option value='de'>DE</option>
                </select>
            </div>
        </>
    );
}
