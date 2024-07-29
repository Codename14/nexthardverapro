'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

type LoadingContext = {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoadingContext = createContext<LoadingContext | null>(null);

export default function LoadingContextProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true); //loading

    return <LoadingContext.Provider value={{ isLoading, setIsLoading }}>{children}</LoadingContext.Provider>;
}

export function useLoadingContext() {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('LoadingContext must should be used within a LoadingContextProvider');
    } else return context;
}
