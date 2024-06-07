import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

export default function LoadingIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
    return (
        <>
            <AiOutlineLoading size={size} className={`loading-anim ${className}`} />
        </>
    );
}
