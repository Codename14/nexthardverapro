'use client';

// Error components must be Client Components

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <div>
            <div className='bg-black flex w-full h-screen flex-col'>
                <p>Technika probléma adódott a szolgáltatónál, kérlek próbáld újra később!</p>
                <p className='error__message'>{error?.message}</p>
            </div>
        </div>
    );
}
