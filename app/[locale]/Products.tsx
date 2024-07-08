import LikeButton from '@/components/LikeButton';
import SearchResultCounter from '@/components/SearchResultCounter';
import { readUserData } from '@/lib/actions';
import prisma from '@/lib/pismaDB';
import { Link } from '@/navigation';
import Image from 'next/image';

export default async function Products({ categoryID, query }: { categoryID: string | undefined; query: string | undefined }) {
    // const t = useTranslations('Products');

    const user = await readUserData();
    // console.log('query:', query);

    // const supabase = createClient();
    // const { data: products, error } = await supabase.from('products').select('*');
    // if (error) {
    //     return <div>{error.message}</div>;
    // }
    const products = await prisma.products.findMany({
        where: {
            category_id: categoryID,
            name: { contains: query?.toLowerCase(), mode: 'insensitive' },
            status: 'active',
            // user_id: user?.id?.toLowerCase(),
            // price: { gt: 105000 },
        },
        orderBy: { created_at: 'desc' },
    });

    return (
        <>
            <SearchResultCounter length={products.length} />
            <section className='products-grid mb-6'>
                {products.map((product) => (
                    <div className='product__item glass-card' key={product.id}>
                        <div className='product__image'>
                            <Link prefetch={true} href={`/items/${product.id}`}>
                                <Image alt={product.name} src={product.tumbnailUrl} fill />
                            </Link>
                            {user && (
                                <LikeButton likesLength={product.likes.length} productID={product.id} likeState={product.likes.includes(user?.id)} />
                            )}
                        </div>
                        <div className='product__body'>
                            <p className='product__name text--light'>{product.name}</p>
                            <p className='product__des text--light'>{product.description}</p>
                            {/* <div className='product__user product__line'>
                                <FaUser />
                                <p>{product.user_email}</p>
                            </div> */}
                            <p className='product__price'>{product.price} Ft</p>
                        </div>
                    </div>
                ))}{' '}
            </section>
        </>
    );
}
