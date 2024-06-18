'use client';
import { IoNotificationsOutline } from 'react-icons/io5';
import { toast } from 'sonner';
import { Popover, PopoverButton, PopoverPanel, useClose } from '@headlessui/react';
import { Link } from '@/navigation';

export default function NotificationDropDown() {
    return (
        <>
            <Popover className='popover'>
                <PopoverButton className={'popover-button'}>
                    <IoNotificationsOutline size={25} />
                </PopoverButton>
                <PopoverPanel anchor='bottom' className='popover-list'>
                    <h2 className='mt-2 small-title'>Értesítések</h2>
                    <Link onClick={() => close()} href='/profile'>
                        Eladtad ezt
                    </Link>
                    <Link onClick={() => close()} href='/notifications'>
                        Összes értesítés
                    </Link>
                </PopoverPanel>
            </Popover>
        </>
    );
}
