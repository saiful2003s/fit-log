import Image from 'next/image';
import React from 'react';

const Footer = () => {
    return (
        <section className='px-6 py-3 bg-[#0d0e10]'>
            <div className='flex justify-between items-center shadow-md px-2 py-4 container mx-auto'>
            <div className='flex justify-center gap-2'>
                <Image src='/footerLogo.png' alt='Footer logo' width={20} height={20} />
                <span className="text-[14px] font-bold"> FITLOG </span>
            </div>
            <p className="text-[12px] text-[#6B7280]">
                © 2026 FitLog — Workout Library. Train hard, log honest.
            </p>
        </div>
        </section>
    );
};

export default Footer;