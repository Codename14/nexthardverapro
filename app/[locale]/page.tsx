import SearchBar from '@/components/SearchBar';
import Products from './Products';
import prisma from '@/lib/pismaDB';
import { Link } from '@/navigation';

export default async function Page({ searchParams }: { searchParams: SearchParamsType }) {
    const categories = await prisma.categories.findMany();

    const createHref = (categoryIdenfier: string) => {
        if (searchParams.categoryID === categoryIdenfier) {
            // If the category is already active, create a URL without the categoryID
            const { categoryID, ...rest } = searchParams;
            const queryString = new URLSearchParams(rest).toString();
            return queryString ? `?${queryString}` : '.';
        } else {
            // If the category is not active, create a URL with the categoryID
            return `?categoryID=${categoryIdenfier}`;
        }
    };
    console.log('par:', searchParams);
    return (
        <>
            <section className='under-navbar'>
                <SearchBar />
                <div className='porduct-categories flex mt-4 mb-6'>
                    {categories.map((category) => (
                        <>
                            <Link
                                // href={`?categoryID=${category.id}`}
                                href={createHref(category.id)}
                                className={`glass-card py-2 px-4 ${searchParams.categoryID === category.id ? 'active' : ''}`}
                                key={category.id}
                            >
                                {category.name}
                            </Link>
                        </>
                    ))}
                </div>
            </section>
            <Products categoryID={searchParams.categoryID} query={searchParams.query} />
        </>
    );
}
