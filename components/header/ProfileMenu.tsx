'use client';
import React from 'react';
import { Popover, PopoverButton, PopoverPanel, useClose } from '@headlessui/react';
import Image from 'next/image';
import { DEFAULT_IMG } from '@/lib/constants';
import { Link } from '@/navigation';

export default function ProfileMenu() {
    let close = useClose();
    return (
        <>
            <Popover className='popover'>
                <PopoverButton className={'popover-button'}>
                    <div className='header__img size-7 '>
                        <Image src={DEFAULT_IMG} alt={'profile'} fill className='rounded-xl w-full h-full object-cover' />
                    </div>
                </PopoverButton>
                <PopoverPanel anchor='bottom' className='popover-list'>
                    <Link onClick={() => close()} href='/account'>
                        Profil
                    </Link>
                    <Link onClick={() => close()} href='/user-settings'>
                        Settings
                    </Link>
                    <Link onClick={() => close()} href='/' className='flex'>
                        Sign out
                    </Link>
                </PopoverPanel>
            </Popover>
        </>
    );
}
