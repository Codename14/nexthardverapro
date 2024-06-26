import { readUserData } from '@/lib/actions';
import prisma from '@/lib/pismaDB';
import { redirect } from '@/navigation';
import UserProfile from '../../(private)/account/UserProfile';
interface Props {
    params: { slug: string };
}
export default async function Page({ params }: Props) {
    const user = await readUserData();
    const products = await prisma.products.findMany({ where: { user_id: params.slug, status: 'active' } });
    const userData = await prisma.user_data.findUnique({ where: { user_id: params.slug } });
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
