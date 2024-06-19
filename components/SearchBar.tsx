import React from 'react';

export default function SearchBar() {
    return (
        <>
            <form action='' className='flex gap-2'>
                <input type='text' placeholder='keresés' className='search-input input--primary' />
                <button className='btn btn--primary'>keresés</button>
            </form>
        </>
    );
}
