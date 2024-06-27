'use client';
import { Dialog, DialogPanel } from '@headlessui/react';
import { useDeleteContext } from '@/contexts/DeleteContext';
import { handleDeleteProduct } from '@/app/[locale]/(private)/account/action/action';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export default function DeleteDialog() {
    const t = useTranslations('form');

    const { isOpen, setIsOpen, activeProduct, setActiveProduct } = useDeleteContext();

    const handleDelete = async () => {
        // console.log('delete');
        if (activeProduct) {
            const res = await handleDeleteProduct(activeProduct.id);
            if (res && !res.success) {
                toast.error(res.error);
            } else {
                toast.success(t('delete_message') + activeProduct.name);
            }
            setActiveProduct(undefined);
        }
    };

    return (
        <>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='z9999 relative p-5 text-center'>
                <div className='delete--background fixed inset-0 flex items-center justify-center p-4'>
                    <DialogPanel className='popper--danger w-full max-w-sm rounded'>
                        <h4 className='small-title'> {t('delete')}</h4>
                        <p className='title'>{activeProduct?.name}</p>
                        <div className='flex gap-4'>
                            <button
                                type='button'
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                                className='btn btn--primary'
                            >
                                {t('go_back_btn')}
                            </button>
                            <button
                                type='button'
                                onClick={() => {
                                    handleDelete(), setIsOpen(false);
                                }}
                                className='btn btn--delete'
                            >
                                {t('delete_btn')}
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}
