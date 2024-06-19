import SearchBar from '@/components/SearchBar';
import Products from './Products';

export default async function Home() {
    const categories = [
        { id: 1, name: 'PC' },
        { id: 2, name: 'hardware' },
        { id: 3, name: 'konzol' },
        { id: 3, name: 'photo-videó' },
        { id: 3, name: 'mobil' },
        { id: 3, name: 'tablet' },
        { id: 3, name: 'laptop' },
        { id: 3, name: 'audió' },
        { id: 3, name: 'tv' },
    ];

    return (
        <>
            <section className='under-navbar'>
                <SearchBar />
                <div className='flex mt-4 mb-6'>
                    {categories.map((category) => (
                        <button className='glass-card py-2 px-4' key={category.id}>
                            {category.name}
                        </button>
                    ))}
                </div>
                {/* <p>UserID: {user?.id}</p> */}
            </section>
            <Products />
        </>
    );
}
