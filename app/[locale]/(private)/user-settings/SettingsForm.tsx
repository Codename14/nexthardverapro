'use client';

import { profileFormSchema, profileZodFormType } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { handleEditProfileData } from '../account/action/action';
import { SubmitButton } from '@/components/SubmitButton';
import { user_data } from '@prisma/client';
import { useTranslations } from 'next-intl';
import LoadingIcon from '@/components/LoadingIcon';

export default function SettingsForm({ userData }: { userData: user_data }) {
    const t = useTranslations('form');
    const p = useTranslations('Profile');

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
            <h1 className='section-title'>{p('profile_edit')}</h1>
            <form
                action={async () => {
                    const result = await trigger();
                    if (!result) return;
                    const profileData = getValues();
                    const res = await handleEditProfileData(profileData);
                    if (res && !res.success) {
                        toast.error(res?.error);
                    } else {
                        toast.success(t('success_message'));
                        reset();
                    }
                }}
                className='my-6'
            >
                <div className='input-control mx-auto'>
                    <input {...register('username')} className='input--primary' type='text' placeholder={t('username')} />
                </div>
                <div className='input-control mx-auto'>
                    <input {...register('country')} className='input--primary' type='text' placeholder={t('country')} />
                </div>
                <SubmitButton
                    disabled={!isDirty || isSubmitting}
                    className='btn btn--primary mt-4'
                    pendingText={
                        <span className='flex gap-2'>
                            <span>{t('btn_update')}</span>
                            <LoadingIcon />
                        </span>
                    }
                >
                    {t('btn_update')}
                </SubmitButton>
            </form>
            <button className='btn btn--outline font-semibold'>{p('delete_account_btn')}</button>
        </>
    );
}
