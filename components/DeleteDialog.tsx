'use client';
import { Dialog, DialogPanel } from '@headlessui/react';
import { useDeleteContext } from '@/contexts/DeleteContext';
import { handleDeleteProduct } from '@/app/[locale]/(private)/account/action/action';
import { toast } from 'sonner';

export default function DeleteDialog() {
    const { isOpen, setIsOpen, activeProduct, setActiveProduct } = useDeleteContext();

    const handleDelete = async () => {
        // console.log('delete');
        if (activeProduct) {
            const res = await handleDeleteProduct(activeProduct.id);
            if (res && !res.success) {
                toast.error(res.error);
            } else {
                toast.success('Sikeresen törölve: ' + activeProduct.name);
            }
            setActiveProduct(undefined);
        }
    };

    return (
        <>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='z9999 relative p-5 text-center'>
                <div className='delete--background fixed inset-0 flex items-center justify-center p-4'>
                    <DialogPanel className='popper--danger w-full max-w-sm rounded'>
                        <h4 className='small-title'> Biztosan törölni szeretnéd?</h4>
                        <p className='title'>{activeProduct?.name}</p>
                        <div className='flex gap-4'>
                            <button
                                type='button'
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                                className='btn btn--primary'
                            >
                                Vissza
                            </button>
                            <button
                                type='button'
                                onClick={() => {
                                    handleDelete(), setIsOpen(false);
                                }}
                                className='btn btn--delete'
                            >
                                Törlés Mindenképp
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}
