import { Link } from '@/navigation';
import React from 'react';
import { FaVoicemail } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import AccountBottonMenu from './AccountBottonMenu';
import { products, user_data, users } from '@prisma/client';
import Image from 'next/image';
import { DEFAULT_IMG } from '@/lib/constants';
import { useTranslations } from 'next-intl';
type Props = {
    // user: users;
    userData: user_data;
    ownProducts: products[];
    itsMe: boolean;
};
export default function UserProfile({ userData, ownProducts, itsMe }: Props) {
    const t = useTranslations('Profile');

    return (
        <>
            <div className='under-navbar screen-container'>
                <section className='own-profile'>
                    <div className='flex gap-5'>
                        <div className='profile__img relative size-10'>
                            <Image src={DEFAULT_IMG} alt={'asd'} fill />
                        </div>
                        <div className='profile__details'>
                            <div className='profile__title'>
                                <h4 className='small-title'>{userData.user_name ?? userData.email}</h4>
                                <p>{t('not_rated')}</p>
                            </div>
                            <div className='profile__info'>
                                <div className='flex'>
                                    <FaVoicemail size={25} />
                                    <p>{userData.email}</p>
                                </div>
                                <div className='flex'>
                                    <FaLocationDot size={25} />
                                    <p>{userData?.country}</p>
                                </div>
                                {/* <div className='flex'>
                                <FaWifi size={25} />
                                <p>0 követő , 0 követés</p>
                            </div> */}
                            </div>
                        </div>
                    </div>
                    {itsMe && (
                        <Link href='/user-settings' className='btn btn--primary'>
                            {t('profile_edit')}
                        </Link>
                    )}
                </section>
                {/* <p>{user.last_sign_in_at}</p> */}
                <AccountBottonMenu ownProducts={ownProducts} itsMe={itsMe} />
            </div>
        </>
    );
}
