'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
    FaCheck,
    FaClock,
    FaFire,
    FaStar,
} from 'react-icons/fa';

import { usePlan } from '../context/PlanContext';
import Link from 'next/link';
import { FaXmark } from 'react-icons/fa6';

const MyPlan = () => {
    const [activeTab, setActiveTab] = useState<'plan' | 'saved'>(
        'plan'
    );

    const {
        plan,
        saved,
        removeFromPlan,
        removeFromSaved,
        toggleDone,
    } = usePlan();

    const totalMinutes = plan.reduce(
        (total, item) => total + item.duration,
        0);

    const totalCalories = plan.reduce(
        (total, item) => total + item.caloriesBurned,
        0);

    const activeItems =
        activeTab === 'plan' ? plan : saved;

    return (
        <main className="container mx-auto px-6 py-10">

            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    MY PLAN
                </h1>

                <p className="mt-2 text-gray-500">
                    Cap of five lifts for today. Finish them, then load more.
                </p>
            </div>

            <div className="flex justify-between rounded-xl border border-gray-700 bg-base-300/40 p-5 mb-8">

                <div className=" p-5">
                    <p className="text-sm text-gray-500">
                        Exercises
                    </p>

                    <p className="mt-2 text-3xl font-bold text-[#C2F800]">
                        {plan.length}
                    </p>
                </div>

                <div className=" p-5">
                    <p className="text-sm text-gray-500">
                        Minutes
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {totalMinutes}
                    </p>
                </div>

                <div className="p-5">
                    <p className="text-sm text-gray-500">
                        Calories
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {totalCalories}
                    </p>
                </div>

            </div>


            <div className="mb-6 border-b border-gray-700">

                <div className="flex gap-8">

                    <button
                        onClick={() => setActiveTab('plan')}
                        className={`pb-3 font-semibold ${activeTab === 'plan'
                            ? 'border-b-2 border-[#C2F800] text-[#C2F800]'
                            : 'text-gray-500'
                            }`}
                    >
                        Plan ({plan.length})
                    </button>

                    <button
                        onClick={() => setActiveTab('saved')}
                        className={`pb-3 font-semibold ${activeTab === 'saved'
                            ? 'border-b-2 border-[#C2F800] text-[#C2F800]'
                            : 'text-gray-500'
                            }`}
                    >
                        Saved ({saved.length})
                    </button>

                </div>

            </div>

            <div className="space-y-4">

                {activeItems.length === 0 ? (

                    <div className="rounded-xl border border-gray-700 bg-base-300/40 py-16 text-center">
                        <h2 className="text-xl font-semibold">
                            NOTHING HERE YET
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Browse the library and add a lift to get today moving.
                        </p>
                        <Link href="/" className="bg-[#C2F800] text-black mt-4 inline-block rounded-lg px-6 py-2 font-semibold">
                            Go to workouts
                        </Link>
                    </div>

                ) : (

                    activeItems.map((group) => (

                        <div
                            key={group.id}
                            className={`flex overflow-hidden rounded-xl border border-gray-700 bg-base-300/40 ${group.isDone
                                ? 'opacity-60'
                                : ''
                                }`}
                        >

                            <Image
                                src={group.image}
                                alt={group.name}
                                width={220}
                                height={150}
                                className="h-40 w-56 object-cover"
                            />

                            <div className="flex flex-1 justify-between p-5">

                                <div>

                                    <h2
                                        className={` text-xl font-bold ${group.isDone
                                            ? 'line-through'
                                            : ''
                                            }`}
                                    >
                                        {group.name}
                                    </h2>

                                    <p className="mb-2 text-sm text-gray-500">
                                        {group.equipment}
                                    </p>

                                    <div className="mt-3 flex gap-5 text-sm text-gray-500">

                                        <span className="flex items-center gap-2">
                                            <FaClock className="text-yellow-400" />
                                            {group.duration} min
                                        </span>

                                        <span className="flex items-center gap-2">
                                            <FaFire className="text-yellow-400"/>
                                            {group.caloriesBurned} kcal
                                        </span>

                                        <span className="flex items-center gap-2">
                                            <FaStar className="text-yellow-400" />
                                            {group.rating}
                                        </span>

                                    </div>

                                </div>

                                <div className="flex items-center gap-3">

                                    <Link
                                href="/"
                                className="btn rounded-2xl border-olive-600"
                            >
                                View Details
                            </Link>
                                    {activeTab === 'plan' && (
                                        <button
                                            onClick={() =>
                                                toggleDone(
                                                    group.id
                                                )
                                            }
                                            className="btn btn-sm bg-[#C2F800] text-black border-none"
                                        >
                                            <FaCheck />

                                            {group.isDone
                                                ? 'Done'
                                                : 'Mark as done'}
                                        </button>
                                    )}

                                    <button
                                        onClick={() =>
                                            activeTab === 'plan'
                                                ? removeFromPlan(
                                                    group.id
                                                )
                                                : removeFromSaved(
                                                    group.id
                                                )
                                        }
                                        className="btn btn-sm btn-ghost text-red-400"
                                    >
                                        <FaXmark />
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))
                )}

            </div>

        </main>
    );
};

export default MyPlan;