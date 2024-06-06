'use server';
import { createSerClient } from '../supabase/server';

// serveren, nem biztonságos lekérni a sessiont subabase szerint
// export default async function readUserSession(){
//     const supabase = await createSerClient();
//     return supabase.auth.getSession();
// }
export async function readUserData() {
    const supabase = await createSerClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    return user;
}

export async function readUserRole() {
    const supabase = await createSerClient();
    return supabase.from('users_role').select('*').single();
}
