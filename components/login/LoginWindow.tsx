'use client';
import { useLoginWindowContext } from '@/contexts/LoginWindowContext';
import { Description, Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import HelperText from '../HelperText';
import GoogleLoginButton from './GoogleLoginButton';
import { AnimatePresence, motion } from 'framer-motion';
import { SubmitButton } from '../SubmitButton';
import LoadingIcon from '../LoadingIcon';
import { useState } from 'react';
import { signIn } from '@/actions/action';
import { toast } from 'sonner';
import { MdAdminPanelSettings } from 'react-icons/md';

export default function LoginWindow() {
    const [emailLogin, setEmailLogin] = useState(false);
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
                                    <button className='absolute bottom-2 left-2' onClick={() => setEmailLogin(!emailLogin)}>
                                        <MdAdminPanelSettings />
                                    </button>
                                    <GoogleLoginButton />
                                    <AnimatePresence mode='wait'>
                                        {emailLogin && (
                                            <motion.form
                                                className='login__form overflow-hidden'
                                                initial={{ height: 0 }}
                                                animate={{ height: 'auto' }}
                                                // transition={{ duration: 0.5 }}
                                                exit={{ height: 0 }}
                                                action={async (formData) => {
                                                    const res = await signIn(formData);
                                                    if (!res.success) {
                                                        toast.error(res?.error);
                                                    } else {
                                                        toast.success('Sikeres bejelentkezés');
                                                        setIsOpen(false);
                                                    }
                                                }}
                                            >
                                                <div>
                                                    <p className='side-lines'>vagy</p>
                                                    <p>Admin belépés</p>
                                                    <input
                                                        className='input--primary my-1 px-2 py-2'
                                                        name='email'
                                                        placeholder='you@example.com'
                                                        required
                                                    />
                                                    <input
                                                        className='input--primary my-1 px-2 py-2'
                                                        type='password'
                                                        name='password'
                                                        placeholder='••••••••'
                                                        required
                                                    />
                                                    <SubmitButton
                                                        className='btn btn--primary my-4 flex mx-auto '
                                                        pendingText={
                                                            <>
                                                                <span className='mr-2'>Adatok betöltése</span>
                                                                <LoadingIcon className='flex' />
                                                            </>
                                                        }
                                                    >
                                                        Belépés
                                                    </SubmitButton>
                                                </div>
                                            </motion.form>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </DialogPanel>
                        </motion.div>
                    </Dialog>
                )}
            </AnimatePresence>
        </>
    );
}
