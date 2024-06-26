import { readUserData } from '@/lib/actions';
import { createSerClient } from '@/lib/supabase/server';
import { DEFAULT_IMG } from '@/lib/constants';
import Image from 'next/image';
import { FaLocationDot, FaVoicemail, FaWifi } from 'react-icons/fa6';
import { Link } from '@/navigation';
import AccountBottonMenu from './AccountBottonMenu';
import prisma from '@/lib/pismaDB';

export default async function AccountPage() {
    const user = await readUserData();
    if (!user) {
        return <p>There is no user</p>;
    }
    const ownProducts = await prisma.products.findMany({ where: { user_id: user.id } });
    const userData = await prisma.user_data.findFirst({ where: { user_id: user.id } });

    return (
        <div className='under-navbar screen-container'>
            <section className='own-profile'>
                <div className='flex gap-5'>
                    <div className='profile__img relative size-10'>
                        <Image src={DEFAULT_IMG} alt={'asd'} fill />
                    </div>
                    <div className='profile__details'>
                        <div className='profile__title'>
                            <h4 className='small-title'>{userData?.name || user.email}</h4>
                            <p>Még nincs értékelés</p>
                        </div>
                        <div className='profile__info'>
                            <div className='flex'>
                                <FaVoicemail size={25} />
                                <p>{user.email}</p>
                            </div>
                            <div className='flex'>
                                <FaLocationDot size={25} />
                                <p>{userData?.country}</p>
                            </div>
                            <div className='flex'>
                                <FaWifi size={25} />
                                <p>0 követő , 0 követés</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Link href='/user-settings' className='btn btn--primary'>
                    Profil szerkesztése
                </Link>
            </section>
            {/* <p>{user.last_sign_in_at}</p> */}
            <AccountBottonMenu ownProducts={ownProducts} />
        </div>
    );
}
