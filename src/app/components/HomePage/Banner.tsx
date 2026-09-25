import React from 'react';
import Image from 'next/image';

const Banner = () => {
    return (
        <div className='mx-6 my-8'>
            <div className='bg-[#222630]  rounded-lg border border-[#323231] container mx-auto'>
                <div className='grid grid-cols-[2fr_1fr] gap-4 items-center justify-center  px-6 py-8'>
                    <div className=''>
                        <h5 className='text-[#C2F800] font-bold text-[11px] mb-3'>WORKOUT LIBRARY</h5>
                        <h2 className='text-white font-extrabold text-[60px] leading-15 tracking-[-1.5px]'>TRAIN WITH INTENT. LOG <br /> EVERY SET.</h2>
                        <p className='text-[#9CA3AF] my-5'>FitLog is a dark, no-nonsense gym companion: pick a lift, lock it <br />
                            into today's plan, and watch the week's work add up.</p>
                        <button className="btn bg-[#C2F800] text-black font-semibold">BROWSE WORKOUTS</button>
                    </div>
                    <Image src="/banner.png" alt="banner pic" width={400} height={300} className="w-full h-auto" />
                </div>
            </div>
        </div>
    );
};

export default Banner;