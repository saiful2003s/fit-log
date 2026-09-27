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

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    MY PLAN
                </h1>

                <p className="mt-2 text-gray-500">
                    Cap of five lifts for today. Finish them, then load more.
                </p>
            </div>


            {/* Summary */}
            <div className="mb-8 flex justify-between rounded-xl border border-gray-700 bg-base-300/40 p-5">

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


            {/* Tabs */}
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


            {/* Sort By */}
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


            {/* Cards */}
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
                            className={`flex overflow-hidden rounded-xl border border-gray-700 bg-base-300/40 ${group.isDone
                                ? 'opacity-60'
                                : ''
                                }`}
                        >

                            {/* Image */}
                            <Image
                                src={group.image}
                                alt={group.name}
                                width={220}
                                height={150}
                                className="h-40 w-56 object-cover"
                            />


                            {/* Content */}
                            <div className="flex flex-1 justify-between p-5">

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


                                    <div className="mt-3 flex gap-5 text-sm text-gray-500">

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


                                {/* Actions */}
                                <div className="flex items-center gap-3">

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
                                                toast.success(`marked as done`);
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
                                                toast.success(`removed from plan`);
                                            } else {
                                                removeFromSaved(group.id);
                                                toast.success(`removed from saved`);
                                            }
                                        }}
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