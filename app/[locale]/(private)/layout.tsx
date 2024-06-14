import { readUserData } from '@/lib/actions';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await readUserData();

    if (!user) {
        redirect('/');
    }

    return <>{children}</>;
}
