import Link from 'next/link';
import React from 'react';
export default function NotFoundPage() {
    return (
        <html>
            <body className='light-theme'>
                <section className='page_404 under-navbar'>
                    <div className='contant_box_404'>
                        <div className='four_zero_four_bg'>
                            <h1 className='title-404'>404</h1>
                        </div>
                        <h3 className='section-title'>Úgy tűnik elvesztél,</h3>
                        <div className='flex'>
                            <p>Az oldal amit keresel nem található!</p>
                        </div>
                        <Link href='/' className='btn btn--secondary'>
                            Vissza a főoldalra
                        </Link>
                    </div>
                </section>
            </body>
        </html>
    );
}
