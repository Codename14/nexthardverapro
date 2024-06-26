import { readUserData } from '@/lib/actions';
import { createSerClient } from '@/lib/supabase/server';
import { DEFAULT_IMG } from '@/lib/constants';
import Image from 'next/image';
import { FaLocationDot, FaVoicemail, FaWifi } from 'react-icons/fa6';
import { Link, redirect } from '@/navigation';
import AccountBottonMenu from './AccountBottonMenu';
import prisma from '@/lib/pismaDB';
import UserProfile from './UserProfile';

export default async function AccountPage() {
    const user = await readUserData();
    if (!user) {
        return <p>There is no user</p>;
    }

    // fetch own data
    const ownProducts = await prisma.products.findMany({ where: { user_id: user.id, status: 'active' } });
    const userData = await prisma.user_data.findFirst({ where: { user_id: user.id } });
    const itsMe = true;

    if (!userData) {
        redirect('/');
        return <></>;
    }

    return <UserProfile ownProducts={ownProducts} userData={userData} itsMe={itsMe} />;
}
