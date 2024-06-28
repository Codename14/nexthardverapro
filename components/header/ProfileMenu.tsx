'use client';
import React from 'react';
import { Popover, PopoverButton, PopoverPanel, useClose } from '@headlessui/react';
import Image from 'next/image';
import { DEFAULT_IMG } from '@/lib/constants';
import { Link } from '@/navigation';
import SignOutButton from './SignOutButton';
import { useTranslations } from 'next-intl';
import { CiLogout, CiSettings, CiUser } from 'react-icons/ci';

export default function ProfileMenu({ userImg }: { userImg?: string }) {
    const t = useTranslations('Navigation');

    let close = useClose();
    return (
        <>
            <Popover className='popover'>
                <PopoverButton className={'popover-button'}>
                    <div className='profile_img '>
                        <Image src={userImg ?? DEFAULT_IMG} alt={'profile'} fill className='rounded-xl w-full h-full object-cover' />
                    </div>
                </PopoverButton>
                <PopoverPanel anchor='bottom' className='popover-list'>
                    <Link onClick={() => close()} href='/account' className='flex gap-2'>
                        <CiUser size={25} className='icon' />
                        {t('profile')}
                    </Link>
                    <Link onClick={() => close()} href='/user-settings' className='flex gap-2'>
                        <CiSettings size={25} className='icon' />
                        {t('settings')}
                    </Link>
                    <Link onClick={() => close()} href='/' className='flex gap-2'>
                        <CiLogout size={25} className='icon' />
                        {t('logout')}
                    </Link>
                </PopoverPanel>
            </Popover>
        </>
    );
}
