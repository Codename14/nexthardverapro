// import CalculateTimeAgo from '@/components/CalculateTimeAgo';
import prisma from '@/lib/pismaDB';
// import { Link, redirect } from '@/navigation';
// import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { FaMoneyBill, FaPlaceOfWorship, FaUser } from 'react-icons/fa';
import { MdCategory, MdDateRange, MdOutlineWorkspaces, MdOutlineWysiwyg } from 'react-icons/md';

export async function generateStaticParams() {
    const data = await prisma.products.findMany();
    // console.log('data: ', data);
    if (data) {
        const slugID = data.map((products) => ({
            slug: products.id.toString(),
        }));
        console.log('slugID: ', slugID);
        return slugID;
    }
    return [];
}

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
    // const t = await getTranslations('Products');
    console.log('slug: ', slug);
    const product = await prisma.products.findFirst({
        where: {
            id: slug,
        },
    });

    if (!product) {
        redirect('/');
    }

    return (
        <>
            <div className='item-page'>
                <div className='item__img'>
                    <Image alt={product.name} src={product.tumbnailUrl} fill />
                </div>
                <div className='item__details flex flex-col justify-start'>
                    <div className='item__line'>
                        <FaMoneyBill size='20' />
                        <p className='item__price'>{product.price} Ft</p>
                    </div>
                    <p className='item__name'>{product.name}</p>
                    <div className='item__line'>
                        <MdCategory size='20' />
                    </div>
                    <div className='item__line'>
                        <FaPlaceOfWorship size='20' />
                        <p>{product.place}</p>
                    </div>
                    <div className='item__line'>
                        <MdOutlineWorkspaces size='20' />
                        {/* <p className='item__new'>{product.new ? t('new') : t('used')}</p> */}
                    </div>

                    <div className='item__line item__des'>
                        <MdOutlineWysiwyg size='20' />
                        <p className='item__description'>{product.description}</p>
                    </div>
                    {/* <Link href={`/profile/${product.user_id}`} className='item__line'>
                        <FaUser size='20' />
                    </Link>
                    <div className='item__line'>
                        <MdDateRange size='20' />
                        <CalculateTimeAgo date={product.created_at} className='item__new' />
                    </div> */}
                </div>
            </div>
        </>
    );
}
