'use client';
import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Image from 'next/image';
import { DEFAULT_IMG } from '@/lib/constants';
import { Link } from '@/navigation';
import SignOutButton from './SignOutButton';
import { useTranslations } from 'next-intl';
import { CiLogout, CiSettings, CiUser } from 'react-icons/ci';

export default function ProfileMenu({ userImg }: { userImg?: string }) {
    const t = useTranslations('Navigation');

    return (
        <div className='header-menu'>
            <Menu>
                <MenuButton>
                    <div className='profile_img '>
                        <Image src={userImg ?? DEFAULT_IMG} alt={'profile'} fill className='rounded-xl w-full h-full object-cover' />
                    </div>
                </MenuButton>
                <MenuItems anchor='bottom' className='menu-list'>
                    <MenuItem>
                        <Link href='/account' className='flex gap-2'>
                            <CiUser size={25} className='icon' />
                            {t('profile')}
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href='/user-settings' className='flex gap-2'>
                            <CiSettings size={25} className='icon' />
                            {t('settings')}
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href='/' className='flex gap-2'>
                            <CiLogout size={25} className='icon' />
                            {t('logout')}
                        </Link>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>
    );
}
