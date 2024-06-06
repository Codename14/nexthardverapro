'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function AnimatedBg() {
    const pathName = usePathname();

    const interBubbleRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
    // const [targetCoords, setTargetCoords] = useState({ x: 0, y: 0 });

    // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 900px)' });
    const isMobile = useMediaQuery({ maxWidth: 900 });

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;
    function move() {
        curX += (tgX - curX) / 40;
        curY += (tgY - curY) / 40;
        if (interBubbleRef.current) {
            interBubbleRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        }
        requestAnimationFrame(() => {
            move();
        });
    }
    useEffect(() => {
        if (!isMobile && !pathName.includes('app')) {
            const handleMouseMove = (event: MouseEvent) => {
                if (interBubbleRef.current) {
                    tgX = event.clientX;
                    tgY = event.clientY;
                    // interBubbleRef.current.style = `${event.clientX}px`;
                    // interBubbleRef.current.style.top = `${event.clientY}px`;
                    move();
                }
            };
            window.addEventListener('mousemove', handleMouseMove);
            // Cleanup function to remove the event listener
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        }
    }, []);

    return (
        <>
            <div className={`gradient-bg ${pathName.includes('app') ? 'light-opacity' : ''} `}>
                <svg xmlns='http://www.w3.org/2000/svg'>
                    <defs>
                        <filter id='goo'>
                            <feGaussianBlur in='SourceGraphic' stdDeviation='10' result='blur' />
                            <feColorMatrix in='blur' mode='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8' result='goo' />
                            <feBlend in='SourceGraphic' in2='goo' />
                        </filter>
                    </defs>
                </svg>{' '}
                <div className='gradients-container'>
                    <div className='g1'></div>
                    <div className='g2'></div>
                    <div className='g3'></div>
                    <div className='g4'></div>
                    <div className='g5'></div>
                    <div ref={interBubbleRef} className='interactive'></div>
                </div>
            </div>
        </>
    );
}

// document.addEventListener('DOMContentLoaded', () => {
//     const interBubble = document.querySelector<HTMLDivElement>('.interactive')!;
//     let curX = 0;
//     let curY = 0;
//     let tgX = 0;
//     let tgY = 0;

//     function move() {
//         curX += (tgX - curX) / 20;
//         curY += (tgY - curY) / 20;
//         interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
//         requestAnimationFrame(() => {
//             move();
//         });
//     }

//     window.addEventListener('mousemove', (event) => {
//         tgX = event.clientX;
//         tgY = event.clientY;
//     });

//     move();
// });
