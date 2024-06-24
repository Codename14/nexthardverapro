import { Link } from '@/navigation';
import FavoriteIcon from './FavoriteIcon';
import { readUserData } from '@/lib/actions';
import { redirect } from 'next/dist/server/api-utils';

export default async function Page() {
    const user = await readUserData();
    if (!user) {
        redirect('/');
    }

    return (
        <div className='under-navbar text-center screen-container card-padding'>
            <h1 className='section-title font-semibold'>Kedvenc termékek</h1>
            <div className='mt-10 mb-6'>
                <div className='flex mb-2 mt-4'>
                    <FavoriteIcon />
                </div>
                <h2 className='small-title'>Mentsd el a kedvenceid</h2>
                <p className='mx-auto'>A kedvencként megjelölt terméket itt láthatod</p>
            </div>
            <Link href={'/'} className='btn btn--primary mt-4'>
                Böngészés
            </Link>
        </div>
    );
}
