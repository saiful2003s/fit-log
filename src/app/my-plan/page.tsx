'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import {
    FaCheck,
    FaClock,
    FaFire,
    FaStar,
} from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { usePlan } from '../context/PlanContext';

const MyPlan = () => {
    const [activeTab, setActiveTab] = useState<'plan' | 'saved'>(
        'plan'
    );

    const [sortBy, setSortBy] = useState<
        'duration' | 'calories' | 'rating'
    >('duration');

    const {
        plan,
        saved,
        removeFromPlan,
        removeFromSaved,
        toggleDone,
    } = usePlan();

    const activeItems =
        activeTab === 'plan' ? plan : saved;

    const sortedItems = [...activeItems].sort((a, b) => {
        if (sortBy === 'duration') {
            return b.duration - a.duration;
        }

        if (sortBy === 'calories') {
            return b.caloriesBurned - a.caloriesBurned;
        }

        return b.rating - a.rating;
    });

    const totalMinutes = activeItems.reduce(
        (total, item) => total + item.duration,
        0
    );

    const totalCalories = activeItems.reduce(
        (total, item) => total + item.caloriesBurned,
        0
    );

    return (
        <main className="container mx-auto px-6 py-10">

            <div className="mb-8 text-center sm:text-left">
                <h1 className="text-3xl font-bold">
                    MY PLAN
                </h1>

                <p className="mt-2 text-gray-500">
                    Cap of five lifts for today. Finish them, then load more.
                </p>
            </div>

            <div className="mb-8 text-center sm:text-left grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl border border-gray-700 bg-base-300/40 p-5">

                <div className="p-5">
                    <p className="text-sm text-gray-500">
                        Exercises
                    </p>

                    <p className="mt-2 text-3xl font-bold text-[#C2F800]">
                        {activeItems.length}
                    </p>
                </div>

                <div className="p-5">
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


            <div className="mb-6">

                <div
                    role="tablist"
                    className="tabs tabs-border"
                >

                    <button
                        role="tab"
                        onClick={() => setActiveTab('plan')}
                        className={`tab ${activeTab === 'plan'
                            ? 'tab-active text-[#C2F800]'
                            : ''
                            }`}
                    >
                        Plan ({plan.length})
                    </button>

                    <button
                        role="tab"
                        onClick={() => setActiveTab('saved')}
                        className={`tab ${activeTab === 'saved'
                            ? 'tab-active text-[#C2F800]'
                            : ''
                            }`}
                    >
                        Saved ({saved.length})
                    </button>

                </div>

            </div>

            <div className="mb-6 flex items-center justify-end gap-3">

                <span className="text-sm text-gray-500">
                    Sort By
                </span>

                <div className="relative">

                    <select
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(
                                e.target.value as
                                | 'duration'
                                | 'calories'
                                | 'rating'
                            )
                        }
                        className="select select-sm border-gray-700 bg-base-300 pr-8"
                    >
                        <option value="duration">
                            Duration
                        </option>

                        <option value="calories">
                            Calories
                        </option>

                        <option value="rating">
                            Rating
                        </option>
                    </select>

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

                        <Link
                            href="/"
                            className="mt-4 inline-block rounded-lg bg-[#C2F800] px-6 py-2 font-semibold text-black"
                        >
                            Go to workouts
                        </Link>

                    </div>

                ) : (

                    sortedItems.map((group) => (

                        <div
                            key={group.id}
                            className={`overflow-hidden rounded-xl border border-gray-700 bg-base-300/40 ${group.isDone ? 'opacity-60' : ''
                                }`}
                        >

                            <div className="flex flex-col lg:flex-row">

                                <Image
                                    src={group.image}
                                    alt={group.name}
                                    width={220}
                                    height={150}
                                    className="h-48 w-full object-cover sm:h-52 lg:h-40 lg:w-56"
                                />

                                <div className="flex flex-col gap-5 p-5 lg:flex-1 lg:flex-row lg:justify-between">

                                    <div>

                                        <h2
                                            className={`text-xl font-bold ${group.isDone
                                                    ? 'line-through'
                                                    : ''
                                                }`}
                                        >
                                            {group.name}
                                        </h2>

                                        <p className="mb-2 text-sm text-gray-500">
                                            {group.equipment}
                                        </p>

                                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">

                                            <span className="flex items-center gap-2">
                                                <FaClock className="text-yellow-400" />
                                                {group.duration} min
                                            </span>

                                            <span className="flex items-center gap-2">
                                                <FaFire className="text-yellow-400" />
                                                {group.caloriesBurned} kcal
                                            </span>

                                            <span className="flex items-center gap-2">
                                                <FaStar className="text-yellow-400" />
                                                {group.rating}
                                            </span>

                                        </div>

                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 lg:mt-0">

                                        <Link
                                            href={`/workouts/${group.id}`}
                                            className="btn rounded-2xl border border-gray-600 bg-transparent"
                                        >
                                            View Details
                                        </Link>

                                        {activeTab === 'plan' && (

                                            <button
                                                onClick={() => {
                                                    toggleDone(group.id);
                                                    toast.success('Marked as done');
                                                }}
                                                className="btn btn-sm border-none bg-[#C2F800] text-black"
                                            >
                                                <FaCheck />

                                                {group.isDone
                                                    ? 'Done'
                                                    : 'Mark as done'}
                                            </button>

                                        )}

                                        <button
                                            onClick={() => {
                                                if (activeTab === 'plan') {
                                                    removeFromPlan(group.id);
                                                    toast.success(
                                                        'Removed from plan'
                                                    );
                                                } else {
                                                    removeFromSaved(group.id);
                                                    toast.success(
                                                        'Removed from saved'
                                                    );
                                                }
                                            }}
                                            className="btn btn-sm btn-ghost text-red-400"
                                        >
                                            <FaXmark />
                                        </button>

                                    </div>

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