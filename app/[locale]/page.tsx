import { createSerClient } from '@/lib/supabase/server';
import Image from 'next/image';
import { toast } from 'sonner';

export default async function Home() {
    const supabase = await createSerClient();
    const user = await supabase.auth.getUser();
    console.log('user', user);
    return (
        <div className='my-10'>
            <p>{user.data.user?.email}</p>
            <p>{user.data.user?.last_sign_in_at}</p>
        </div>
    );
}
