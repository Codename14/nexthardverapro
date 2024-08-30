'use client';
import { useTheme } from 'next-themes';
import { CiDark, CiLight } from 'react-icons/ci';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const handleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    return (
        <>
            <div className='theme-wrapper'>
                <button onClick={handleTheme} className={`flex gap-2 p-2`}>
                    {theme === 'dark' ? (
                        <>
                            <CiDark size={25} className='icon' />
                            Dark Theme
                        </>
                    ) : (
                        <>
                            <CiLight size={25} className='icon' />
                            Light Theme
                        </>
                    )}
                </button>
            </div>
        </>
    );
}
