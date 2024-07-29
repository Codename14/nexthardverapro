'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

type LoginWindowContext = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginWindowContext = createContext<LoginWindowContext | null>(null);

export default function LoginWindowContextProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return <LoginWindowContext.Provider value={{ isOpen, setIsOpen }}>{children}</LoginWindowContext.Provider>;
}

export function useLoginWindowContext() {
    const context = useContext(LoginWindowContext);
    if (!context) {
        throw new Error('LoginWindowContext must should be used within a LoginWindowContextProvider');
    } else return context;
}
