import { readUserData } from '@/lib/actions';
import prisma from '@/lib/pismaDB';
import UserProfile from './UserProfile';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
    const user = await readUserData();
    if (!user) {
        redirect('/');
    }

    // fetch own data
    const ownProducts = await prisma.products.findMany({ where: { user_id: user.id, status: 'active' } });
    const userData = await prisma.user_data.findUnique({ where: { user_id: user.id } });
    const itsMe = true;

    if (!userData) {
        redirect('/');
    }

    return <UserProfile ownProducts={ownProducts} userData={userData} itsMe={itsMe} />;
}
