'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

type LoginWindowContext = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/* Ilyet nem lehet interface-el */
// type Theme = "dark" | "light";

const LoginWindowContext = createContext<LoginWindowContext | null>(null);

export default function LoginWindowContextProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return <LoginWindowContext.Provider value={{ isOpen, setIsOpen }}>{children}</LoginWindowContext.Provider>;
}

/* egyszerűbb custom hookal mert így ezt kellene checkolni mindenhol */
export function useLoginWindowContext() {
    const context = useContext(LoginWindowContext);
    if (!context) {
        throw new Error('PopperContext must should be used within a PopperContextProvider');
    } else return context;
}
