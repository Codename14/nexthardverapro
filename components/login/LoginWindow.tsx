'use client';
import { useLoginWindowContext } from '@/contexts/LoginWindowContext';
import { Description, Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import HelperText from '../HelperText';
import GoogleLoginButton from './GoogleLoginButton';
import { AnimatePresence, motion } from 'framer-motion';

export default function LoginWindow() {
    const { isOpen, setIsOpen } = useLoginWindowContext();
    return (
        <>
            <AnimatePresence mode='wait'>
                {isOpen && (
                    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='relative z-50'>
                        <motion.div
                            initial={{ y: '-100vh', opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            transition={{ duration: 0.55, ease: 'easeInOut' }}
                            exit={{ y: '100vh', opacity: 0, scale: 0 }}
                            className='fixed inset-0 flex w-screen items-center justify-center p-4'
                        >
                            <DialogPanel className='max-w-lg border glass-card px-10 py-6'>
                                <DialogTitle className='font-bold text-2xl mb-2'>Belépés/Regisztráció</DialogTitle>
                                <HelperText className='flex helper-text'>
                                    Ha hiba lépne fel bejelentkezéskor, próbáld meg a külön böngészőből megnyitni a weboldalt.
                                </HelperText>
                                <div className=' mt-10'>
                                    <GoogleLoginButton />
                                </div>
                            </DialogPanel>
                        </motion.div>
                    </Dialog>
                )}
            </AnimatePresence>
        </>
    );
}
