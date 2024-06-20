'use client';
import React, { useRef, useState } from 'react';

export default function BurgerButton({ className }: { className: string }) {
    // const button = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const handleNavbarClick = () => {
        // navbar.current?.classList.toggle('collapsible--expanded');
        setIsOpen(!isOpen);
    };
    return (
        <button onClick={handleNavbarClick} className={`${className}`}>
            <div className={`burger ${isOpen ? 'burger--active' : ''}`}></div>
        </button>
    );
}
