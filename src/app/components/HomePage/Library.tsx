
import { IgroupsCard } from '@/type/type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaStar, FaClock, FaFire } from 'react-icons/fa';

const getGroups = async () => {
    const response = await fetch(
        'https://api.api-store.workers.dev/api/fitlog'
    );

    const data = await response.json();

    return data;
};

const Groups = async () => {
    const groupsData = await getGroups();

    return (
        <section id='Library' className="mx-6 my-8">
            <div className="container mx-auto">

                <div className="mb-6 text-center md:text-left">
                    <h4 className="font-bold text-white text-[30px]">
                        THE LIBRARY
                    </h4>

                    <p className="text-gray-500">
                        Twelve lifts covering every major muscle group.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                    {groupsData.map((group: IgroupsCard) => (
                        <Link
                            key={group.id}
                            href={`/workouts/${group.id}`}
                            className="card overflow-hidden bg-base-300 shadow-sm hover:shadow-lg transition cursor-pointer"
                        >
                            <figure>
                                <Image
                                    src={group.image}
                                    alt={group.name}
                                    width={500}
                                    height={300}
                                    className="h-52 w-full object-cover"
                                />
                            </figure>

                            <div className="card-body">

                                <div className="flex flex-wrap gap-2">
                                    {group.muscleGroups.map(
                                        (muscle: string, index: number) => (
                                            <span
                                                key={index}
                                                className="rounded-full bg-[#b6f500] px-2.5 py-1 text-[9px] font-bold uppercase text-black"
                                            >
                                                {muscle}
                                            </span>
                                        )
                                    )}
                                </div>

                                <h2 className="card-title">
                                    {group.name}
                                </h2>

                                <p className="text-[12px] text-gray-500">
                                    {group.equipment}
                                </p>

                                <div className="divider"></div>

                                <div className="flex items-center gap-5 text-[10px] text-gray-400">

                                    <div className="flex items-center gap-2">
                                        <FaClock />
                                        <span>
                                            {group.duration} min
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <FaFire />
                                        <span>
                                            {group.caloriesBurned} kcal
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <FaStar />
                                        <span>
                                            {group.rating}
                                        </span>
                                    </div>

                                </div>

                            </div>
                        </Link>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default Groups;

