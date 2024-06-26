import prisma from '@/lib/pismaDB';
import React from 'react';
import Image from 'next/image';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { FaMoneyBill, FaPlaceOfWorship, FaUser } from 'react-icons/fa';
import { MdCategory, MdOutlineFiberNew, MdOutlineWorkspaces, MdOutlineWysiwyg } from 'react-icons/md';
import { Link, redirect } from '@/navigation';
import ProfileMenu from '@/components/header/ProfileMenu';
import UserProfile from '../../(private)/account/UserProfile';
import { readUserData } from '@/lib/actions';
interface Props {
    params: { slug: string };
}
export default async function Page({ params }: Props) {
    const user = await readUserData();
    const products = await prisma.products.findMany({ where: { user_id: params.slug, status: 'active' } });
    const userData = await prisma.user_data.findFirst({ where: { user_id: params.slug } });
    if (!userData) {
        redirect('/');
        return <></>;
    }
    const itsMe = user ? params.slug === user.id : false;

    return (
        <>
            {/* <p>{itsMe ? 'Profilom' : 'notme'}</p> */}
            <UserProfile ownProducts={products} userData={userData} itsMe={itsMe} />
        </>
    );
}
