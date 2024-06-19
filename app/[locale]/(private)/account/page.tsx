import { readUserData } from '@/lib/actions';
import { createSerClient } from '@/lib/supabase/server';
import { DEFAULT_IMG } from '@/lib/constants';
import Image from 'next/image';
import { FaLocationDot, FaMedal, FaPlaceOfWorship, FaVoicemail, FaWifi } from 'react-icons/fa6';
export default async function AccountPage() {
    const user = await readUserData();

    if (!user) {
        return <p>There is no user</p>;
    }
    console.log('user', user);
    return (
        <div className='under-navbar screen-container'>
            <section className='own-profile'>
                <div className='flex gap-5'>
                    <div className='profile__img relative size-10'>
                        <Image src={DEFAULT_IMG} alt={'asd'} fill />
                    </div>
                    <div className='profile__details'>
                        <div className='profile__title'>
                            <h4 className='small-title'>Nagy Adam</h4>
                            <p>Még nincs értékelés</p>
                        </div>
                        <div className='profile__info'>
                            <div className='flex'>
                                <FaVoicemail size={25} />
                                <p>{user.email}</p>
                            </div>
                            <div className='flex'>
                                <FaLocationDot size={25} />
                                <p>Hungary</p>
                            </div>
                            <div className='flex'>
                                <FaWifi size={25} />
                                <p>0 követő , 0 követés</p>
                            </div>
                        </div>
                    </div>
                </div>

                <button className='btn btn--primary'>Profil szerkesztése</button>
            </section>
            <p>{user.last_sign_in_at}</p>

            <section>
                <div className='flex gap-2 action'>
                    <button className='btn btn--primary'>Termékek</button>
                    <button className='btn btn--primary'>Értékelések</button>
                </div>
            </section>
        </div>
    );
}