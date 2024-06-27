'use client';

import { profileFormSchema, profileZodFormType } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { handleEditProfileData } from '../account/action/action';
import { SubmitButton } from '@/components/SubmitButton';
import { user_data } from '@prisma/client';

export default function SettingsForm({ userData }: { userData: user_data }) {
    const {
        register,
        reset,
        watch,
        getValues,
        handleSubmit, //ez pedig onSubmitnál lenne jó
        trigger, //azért kell mert action attributumot használjuk
        formState: { errors, isValid, isDirty, isSubmitting },
    } = useForm<profileZodFormType>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            username: userData.user_name || '',
            country: userData.country,
        },
    });
    return (
        <>
            <form
                action={async () => {
                    const result = await trigger();
                    if (!result) return;
                    const profileData = getValues();
                    const res = await handleEditProfileData(profileData);
                    if (res && !res.success) {
                        toast.error(res?.error);
                    } else {
                        toast.success('Sikeresen frissítettük az adataidat!');
                        reset();
                    }
                }}
                className='my-6'
            >
                <div className='input-control mx-auto'>
                    <input {...register('username')} className='input--primary' type='text' placeholder='Ország' />
                </div>
                <div className='input-control mx-auto'>
                    <input {...register('country')} className='input--primary' type='text' placeholder='Felhasználónév' />
                </div>
                <SubmitButton disabled={isSubmitting || !isDirty} className='btn btn--primary mt-4' pendingText={'Updating...'}>
                    Update
                </SubmitButton>
            </form>
        </>
    );
}
