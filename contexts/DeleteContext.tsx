'use client';
import { products } from '@prisma/client';
import React, { createContext, useContext, useEffect, useState } from 'react';

type DeleteContext = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    activeProduct: products | undefined;
    setActiveProduct: React.Dispatch<React.SetStateAction<products | undefined>>;
};

/* Ilyet nem lehet interface-el */
// type Theme = "dark" | "light";

const DeleteContext = createContext<DeleteContext | null>(null);

export default function DeleteContextProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeProduct, setActiveProduct] = useState<products | undefined>();
    return <DeleteContext.Provider value={{ isOpen, setIsOpen, activeProduct, setActiveProduct }}>{children}</DeleteContext.Provider>;
}

export function useDeleteContext() {
    const context = useContext(DeleteContext);
    if (!context) {
        throw new Error('DeleteContext must should be used within a DeleteContextProvider');
    } else return context;
}
