import React from 'react';

export default function Page() {
    return (
        <>
            <section>
                <h1 className='section-title'>Termék eladása</h1>
                <form action='' className='flex flex-col'>
                    <label htmlFor=''>Hirdetés címe</label>
                    <label htmlFor=''>Képek</label>
                    <input className='input--primary' type='file' />
                    <input className='input--primary' type='text' placeholder='product name' />
                    <label htmlFor=''>Ára</label>
                    <input className='input--primary' type='number' placeholder='product price' />
                    <label htmlFor=''>Adj leírást a termékedhez</label>
                    <textarea cols={50} className='input--primary' placeholder='product description' />

                    <label htmlFor=''>Kategória</label>
                    <select name='Kategória' id=''>
                        <option value=''>AAA</option>
                        <option value=''>BBB</option>
                        <option value=''>CCC</option>
                    </select>
                    <label htmlFor=''>Hely</label>
                    <input className='input--primary' type='text' placeholder='hely' />
                    <button className='btn btn--primary'>Submit</button>
                </form>
            </section>
        </>
    );
}
