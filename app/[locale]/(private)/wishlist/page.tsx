import { Link } from '@/navigation';
import FavoriteIcon from './FavoriteIcon';

export default function Page() {
    return (
        <div className='under-navbar text-center'>
            <h1 className='hero-title font-semibold'>Kedvenc termékek</h1>
            <div className='mt-10 mb-6'>
                <div className='flex mb-2 mt-4'>
                    <FavoriteIcon />
                </div>
                <h2 className='small-title'>Mentsd el a kedvenceid</h2>
                <p className='mx-auto'>A kedvencként megjelölt terméket itt láthatod</p>
            </div>
            <Link href={'/items'} className='btn btn--primary mt-4'>
                Böngészés
            </Link>
        </div>
    );
}
