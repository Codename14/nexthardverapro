import CalculateTimeAgo from '@/components/CalculateTimeAgo';
import LikeButton from '@/components/LikeButton';
import LoginButton from '@/components/header/LoginButton';
import { readUserData } from '@/lib/actions';
import prisma from '@/lib/pismaDB';
import { Link, redirect } from '@/navigation';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { FaMoneyBill, FaPlaceOfWorship, FaUser } from 'react-icons/fa';
import { MdCategory, MdDateRange, MdOutlineWorkspaces, MdOutlineWysiwyg } from 'react-icons/md';

interface Props {
    params: { slug: string };
}
export default async function Page({ params }: Props) {
    const t = await getTranslations('Products');

    const product = await prisma.products.findFirst({
        where: {
            // price: { gt: 105000 },
            id: params.slug,
            status: 'active',
        },
    });

    if (!product) {
        redirect('/');
        return null;
    }

    const userData = await prisma.user_data.findFirst({
        where: {
            // price: { gt: 105000 },
            user_id: product.user_id,
        },
    });
    const category = await prisma.categories.findFirst({
        where: {
            id: product.category_id,
        },
    });
    const user = await readUserData();

    if (!userData) {
        redirect('/');
        return null;
    }

    return (
        <>
            <div className='item-page'>
                <div className='item__img'>
                    <Image alt={product.name} src={product.tumbnailUrl} fill />
                    {user && <LikeButton likesLength={product.likes.length} productID={product.id} likeState={product.likes.includes(user?.id)} />}
                </div>
                <div className='item__details flex flex-col justify-start'>
                    <div className='item__line'>
                        <FaMoneyBill size='20' />
                        <p className='item__price'>{product.price} Ft</p>
                    </div>
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
                        <p className='item__new'>{product.new ? t('new') : t('used')}</p>
                    </div>

                    <div className='item__line item__des'>
                        <MdOutlineWysiwyg size='20' />
                        <p className='item__description'>{product.description}</p>
                        {/* <p className='item__price'>{product.created_at}</p> */}
                    </div>
                    <Link href={`/profile/${product.user_id}`} className='item__line'>
                        <FaUser size='20' />
                        <p className='item__user'>{userData.user_name}</p>
                    </Link>
                    <div className='item__line'>
                        <MdDateRange size='20' />
                        <CalculateTimeAgo date={product.created_at} className='item__new' />
                    </div>
                    {user ? (
                        user.id === product.user_id ? (
                            <div className='flex mt-auto'>
                                <Link href={`/items/${product.id}/edit`} className='btn btn--primary'>
                                    {t('edit_btn')}
                                </Link>
                            </div>
                        ) : (
                            <div className='flex mt-auto'>
                                <Link href={`/messages?param=${product.id}&param2=${product.user_id}`} className='btn btn--primary'>
                                    {t('message_send_btn')}
                                </Link>
                            </div>
                        )
                    ) : (
                        <></>
                    )}
                    {!user && <LoginButton className='btn btn--primary'>{t('login_btn')}</LoginButton>}
                </div>
            </div>
        </>
    );
}
