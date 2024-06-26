import React from 'react';

export default function Page() {
    return (
        <>
            <div className='under-navbar screen-container card-padding'>
                <section className='mysettings'>
                    <div className='settings__sidebar'>
                        <h1 className='section-title'>Beállítások</h1>
                        <form action='' className='my-6'>
                            <div className='input-control mx-auto'>
                                <input className='input--primary' type='text' placeholder='Ország' />
                            </div>
                            <div className='input-control mx-auto'>
                                <input className='input--primary' type='text' placeholder='Felhasználónév' />
                            </div>
                            <button className='btn btn--primary mt-4'>Update</button>
                        </form>
                        <button className='btn btn--outline'>Fiók megszűntetése</button>
                    </div>
                </section>
            </div>
        </>
    );
}
