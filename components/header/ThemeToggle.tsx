'use client';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
// import PreLoading from './Preloader/PreLoading';
import { useLoadingContext } from '@/contexts/LoadingContext';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<string | null>(null);
    const { isLoading, setIsLoading } = useLoadingContext();
    const themes = ['superdark', 'light', 'superdark-orange'];
    const toggle = useRef(null);

    /* Theme betöltése */
    useEffect(() => {
        setTheme(localStorage.getItem('theme'));
        const initialTheme = localStorage.getItem('theme');
        if (!initialTheme) {
            setTheme('superdark');
        }

        setTimeout(() => {
            setIsLoading(false);
            document.body.style.cursor = 'default';
            window.scrollTo(0, 0);
        }, 1000);
    }, []);

    const handleTheme = () => {
        if (theme) {
            // console.log('theme:', theme);
            // console.log('index:', themes.indexOf(theme));

            if (themes.indexOf(theme) === themes.length - 1) {
                const newtheme = themes[0];
                setTheme(newtheme);
                localStorage.setItem('theme', newtheme);
            } else {
                const newtheme = themes[themes.indexOf(theme) + 1];
                setTheme(newtheme);
                console.log('newtheme', newtheme);
                localStorage.setItem('theme', newtheme);
            }
        }
    };

    return (
        <>
            <div className='theme-wrapper'>
                <div className='theme-container'>
                    <label className={`theme-toggle ${theme ? theme : 'light'}-theme sr-only`}>{theme}</label>
                    <label className={`theme-switch ${theme === 'superdark' || theme === 'superdark-orange' ? 'dark' : ''}`} onClick={handleTheme}>
                        <input type='checkbox' />
                        <span className='slider'></span>
                    </label>
                </div>
            </div>
        </>
    );
}
