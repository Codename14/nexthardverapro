import FavoriteIcon from './FavoriteIcon';

export default function Page() {
    return (
        <div className='under-navbar text-center'>
            <h1 className='hero-title font-semibold'>Kedvenc termékek</h1>
            <div className='flex mb-2 mt-4'>
                <FavoriteIcon />
            </div>
            <h2 className='small-title'>Mentsd el a kedvenceid</h2>
            <p className='mx-auto'>A kedvencként megjelölt terméket itt láthatod</p>
            <button className='btn btn--primary'>Böngészés</button>
        </div>
    );
}
