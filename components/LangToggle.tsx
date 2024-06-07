'use client';
import { useLoadingContext } from '@/contexts/LoadingContext';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useRef, useTransition } from 'react';

export default function LangToggle() {
    const [isPending, startTransition] = useTransition();
    // const { isLoading, setIsLoading } = useLoadingContext();
    const toggle = useRef(null);

    const router = useRouter();
    const localActive = useLocale();

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

    return (
        <>
            {/* <label className='border-2 rounded text-xl'>
                <p className='sr-only'>change language</p>
                <select defaultValue={localActive} className='bg-transparent py-2' onChange={onSelectChange} disabled={isPending}>
                    <option value='en'>English</option>
                    <option value='hu'>Hungary</option>
                </select>
            </label> */}
            <div ref={toggle} className='languages flex'>
                <button className={`${localActive === 'en' && 'selected-lang bg-gray-400'}`} onClick={() => handleLanguage('en')}>
                    EN
                </button>
                <button className={`${localActive === 'hu' && 'selected-lang bg-gray-400'}`} onClick={() => handleLanguage('hu')}>
                    HU
                </button>
                <button className={`${localActive === 'de' && 'selected-lang bg-gray-400'}`} onClick={() => handleLanguage('de')}>
                    DE
                </button>
            </div>
            {/* <p>{isPending && 'loading...'}</p> */}
        </>
    );
}
