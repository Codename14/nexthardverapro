'use client';
import React from 'react';
import { Popover, PopoverButton, PopoverPanel, useClose } from '@headlessui/react';
import Image from 'next/image';
import { DEFAULT_IMG } from '@/lib/constants';
import { Link } from '@/navigation';
import SignOutButton from './SignOutButton';
import { useTranslations } from 'next-intl';

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
                    <Link onClick={() => close()} href='/account'>
                        {t('profile')}
                    </Link>
                    <Link onClick={() => close()} href='/user-settings'>
                        {t('settings')}
                    </Link>
                    <Link onClick={() => close()} href='/' className='flex'>
                        <SignOutButton text={t('logout')} />
                    </Link>
                </PopoverPanel>
            </Popover>
        </>
    );
}
