import { Link, redirect } from '@/navigation';
import FavoriteIcon from './FavoriteIcon';
import { readUserData } from '@/lib/actions';
import prisma from '@/lib/pismaDB';
import LikeButton from '@/components/LikeButton';
import Image from 'next/image';

export default async function Page() {
    const user = await readUserData();
    if (!user) {
        redirect('/');
    }

    const products = await prisma.products.findMany({
        where: {
            likes: {
                has: user?.id,
            },
            status: 'active',
        },
    });

    return (
        <>
            <div className='under-navbar text-center screen-container card-padding'>
                <h1 className='section-title font-semibold'>Kedvenc termékek</h1>
                {products.length > 0 ? (
                    <section className='products-grid mb-6'>
                        {products.map((product) => (
                            <div className='product__item glass-card' key={product.id}>
                                <div className='product__image'>
                                    <Link href={`/items/${product.id}`}>
                                        <Image alt={product.name} src={product.tumbnailUrl} fill />
                                    </Link>
                                    {user && (
                                        <LikeButton
                                            likesLength={product.likes.length}
                                            productID={product.id}
                                            likeState={product.likes.includes(user?.id)}
                                        />
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
                        ))}
                    </section>
                ) : (
                    <>
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
                    </>
                )}
            </div>
        </>
    );
}
