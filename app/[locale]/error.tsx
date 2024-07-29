'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <div>
            <div className='glass-card flex w-full h-screen flex-col'>
                <h1 className='section-title'>Technika probléma adódott, kérlek próbáld újra később!</h1>
                <p className='error__message'>{error?.message}</p>
            </div>
        </div>
    );
}
