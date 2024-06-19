import SearchBar from '@/components/SearchBar';
import Products from './Products';
import prisma from '@/lib/pismaDB';
import { Link } from '@/navigation';

export default async function Page({ searchParams }: { searchParams: SearchParamsType }) {
    const categories = await prisma.categories.findMany();
    console.log('par:', searchParams);
    return (
        <>
            <section className='under-navbar'>
                <SearchBar />
                <div className='flex mt-4 mb-6'>
                    {categories.map((category) => (
                        <>
                            <Link
                                href={`?categoryID=${category.id}`}
                                className={`porduct-categories glass-card py-2 px-4 ${searchParams.categoryID === category.id ? 'active' : ''}`}
                                key={category.id}
                            >
                                {category.name}
                            </Link>
                        </>
                    ))}
                </div>
            </section>
            <Products categoryID={searchParams.categoryID} />
        </>
    );
}
