import prisma from '@/lib/pismaDB';
import React from 'react';
import Image from 'next/image';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { FaPlaceOfWorship, FaUser } from 'react-icons/fa';
import { MdCategory, MdOutlineFiberNew, MdOutlineWorkspaces, MdOutlineWysiwyg } from 'react-icons/md';
import { Link } from '@/navigation';
import LikeButton from '@/components/LikeButton';
import { readUserData } from '@/lib/actions';
interface Props {
    params: { slug: string };
}
export default async function Page({ params }: Props) {
    const product = await prisma.products.findFirst({
        where: {
            // price: { gt: 105000 },
            id: params.slug,
        },
    });

    if (!product) return <div>404</div>;

    const userData = await prisma.users.findFirst({
        where: {
            // price: { gt: 105000 },
            id: product.user_id,
        },
    });
    const category = await prisma.categories.findFirst({
        where: {
            id: product.category_id,
        },
    });
    const user = await readUserData();

    return (
        <>
            <div className='item-page'>
                <div className='item__img'>
                    <Image alt={product.name} src={product.tumbnailUrl} fill />
                    {user && <LikeButton likesLength={product.likes.length} productID={product.id} likeState={product.likes.includes(user?.id)} />}
                </div>
                <div className='item__details flex flex-col justify-start'>
                    <p className='item__price'>{product.price} Ft</p>
                    <p className='item__name'>{product.name}</p>
                    <div className='item__line'>
                        <MdCategory size='20' />
                        <Link href={`/?categoryID=${category?.id}`}>
                            <p>{category?.name}</p>
                        </Link>
                    </div>
                    <div className='item__line'>
                        <FaPlaceOfWorship size='20' />
                        <p>{product.place}</p>
                    </div>
                    <div className='item__line'>
                        <MdOutlineWorkspaces size='20' />
                        <p className='item__new'>{product.new ? 'Új' : 'Régi'}</p>
                    </div>

                    <div className='item__line'>
                        <MdOutlineWysiwyg size='20' />
                        <p className='item__description'>{product.description}</p>
                        {/* <p className='item__price'>{product.created_at}</p> */}
                    </div>
                    <div className='item__line'>
                        <FaUser size='20' />
                        <p className='item__user'>{userData?.email}</p>
                    </div>
                    <div className='flex mt-auto'>
                        <button className='btn btn--primary'>Írok a feladónak</button>
                    </div>
                </div>
            </div>
        </>
    );
}
