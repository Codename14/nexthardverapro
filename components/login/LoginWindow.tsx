'use client';
import { useLoginWindowContext } from '@/contexts/LoginWindowContext';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';
import HelperText from '../HelperText';
import GoogleLoginButton from './GoogleLoginButton';

export default function LoginWindow() {
    const { isOpen, setIsOpen } = useLoginWindowContext();
    return (
        <>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='relative z-50'>
                <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
                    <DialogPanel className='max-w-lg space-y-4 border glass-card p-12'>
                        <DialogTitle className='font-bold text-2xl mb-2'>Belépés/Regisztráció</DialogTitle>
                        <HelperText className='flex helper-text'>
                            Ha hiba lépne fel bejelentkezéskor, próbáld meg a külön böngészőből megnyitni a weboldalt.
                        </HelperText>

                        <GoogleLoginButton />
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}
