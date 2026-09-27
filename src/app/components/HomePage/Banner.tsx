import React from 'react';
import Image from 'next/image';
import { FaArrowDown } from 'react-icons/fa';


const Banner = () => {
    return (
        <div className='mx-6 my-8'>
            <div className='bg-[#222630]  rounded-lg border border-[#323231] container mx-auto'>
                <div className='md:grid md:grid-cols-[2fr_1fr] gap-4 items-center justify-center  px-6 py-8'>
                    <div className='md:mb-0 mb-6'>
                        <h5 className='text-[#C2F800] font-bold text-[11px] md:mb-3'>WORKOUT LIBRARY</h5>
                        <h2 className='text-white font-extrabold text-[24px] sm:text-[40px] md:text-[60px] md:leading-15 md:tracking-[-1.5px]'>TRAIN WITH INTENT. LOG <br /> EVERY SET.</h2>
                        <p className='text-[#9CA3AF] my-2 sm:my-5'>FitLog is a dark, no-nonsense gym companion: pick a lift, lock it <br />
                            into today's plan, and watch the week's work add up.</p>
                        <a href="#Library" className="btn bg-[#C2F800] text-black font-semibold">< FaArrowDown /> BROWSE WORKOUTS</a>
                    </div>
                    <Image src="/banner.png" alt="banner pic" width={400} height={300} className="w-[220px] sm:w-[280px] md:w-[350px] lg:w-[400px] h-auto mx-auto" />
                </div>
            </div>
        </div>
    );
};

export default Banner;