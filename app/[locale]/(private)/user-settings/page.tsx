import React from 'react';
import SettingsForm from './SettingsForm';
import prisma from '@/lib/pismaDB';
import { readUserData } from '@/lib/actions';
import { redirect } from 'next/navigation';

export default async function Page() {
    const user = await readUserData();

    if (!user) {
        redirect('/');
    }

    const userData = await prisma.user_data.findUnique({ where: { user_id: user.id } });

    if (!userData) {
        redirect('/');
    }
    return (
        <>
            <div className='under-navbar screen-container card-padding'>
                <section className='mysettings'>
                    <div className='settings__sidebar'>
                        <h1 className='section-title'>Profil szerkesztése</h1>
                        <SettingsForm userData={userData} />
                        <button className='btn btn--outline font-semibold'>Fiók megszűntetése</button>
                    </div>
                </section>
            </div>
        </>
    );
}
