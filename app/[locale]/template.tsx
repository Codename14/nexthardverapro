'use client';
import { AnimationSequence, animate, motion } from 'framer-motion';
import React, { useEffect } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
    // const sequence: AnimationSequence = [
    //     ['.pageloading', { y: 0 }, { duration: 0.3, ease: [0.76, 0, 0.24, 1] }],
    //     ['.pageloading', { y: 0 }, { duration: 0.3 }],
    //     ['.pageloading', { top: '100vh' }, { duration: 0.3 }],
    // ];

    // useEffect(() => {
    //     animate(sequence);
    // }, []);

    return (
        <>
            {/*  <motion.div initial={{ y: '-100vh' }} className='pageloading'>
                <span className='pageloader-littleanim'></span>
            </motion.div> */}
            {/* {children} */}
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.25 }}>
                {children}
            </motion.div>
        </>
    );
}
