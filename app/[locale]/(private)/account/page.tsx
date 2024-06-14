import { readUserData } from '@/lib/actions';
import { createSerClient } from '@/lib/supabase/server';

export default async function AccountPage() {
    const user = await readUserData();

    if (!user) {
        return <p>There is no user</p>;
    }
    console.log('user', user);
    return (
        <div className='my-10'>
            <p>{user.email}</p>
            <p>{user.last_sign_in_at}</p>
        </div>
    );
}
