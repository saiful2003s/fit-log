'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
    FaCheck,
    FaTrash,
    FaClock,
    FaFire,
} from 'react-icons/fa';

import { usePlan } from '../context/PlanContext';

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
        0
    );

    const totalCalories = plan.reduce(
        (total, item) => total + item.caloriesBurned,
        0
    );

    const activeItems =
        activeTab === 'plan' ? plan : saved;

    return (
        <main className="container mx-auto px-6 py-10">

            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    My Plan
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage your workouts and saved exercises.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">

                <div className="rounded-xl border border-gray-700 bg-base-300/40 p-5">
                    <p className="text-sm text-gray-500">
                        Exercises
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {plan.length}
                    </p>
                </div>

                <div className="rounded-xl border border-gray-700 bg-base-300/40 p-5">
                    <p className="text-sm text-gray-500">
                        Total Minutes
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {totalMinutes}
                    </p>
                </div>

                <div className="rounded-xl border border-gray-700 bg-base-300/40 p-5">
                    <p className="text-sm text-gray-500">
                        Total Calories
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
                        className={`pb-3 font-semibold ${
                            activeTab === 'plan'
                                ? 'border-b-2 border-[#C2F800] text-[#C2F800]'
                                : 'text-gray-500'
                        }`}
                    >
                        Plan ({plan.length})
                    </button>

                    <button
                        onClick={() => setActiveTab('saved')}
                        className={`pb-3 font-semibold ${
                            activeTab === 'saved'
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
                            {activeTab === 'plan'
                                ? 'Your plan is empty'
                                : 'No saved exercises'}
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            {activeTab === 'plan'
                                ? "Add exercises from the library."
                                : "Save exercises to find them here later."}
                        </p>
                    </div>

                ) : (

                    activeItems.map((group) => (

                        <div
                            key={group.id}
                            className={`flex overflow-hidden rounded-xl border border-gray-700 bg-base-300/40 ${
                                group.isDone
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

                            <div className="flex flex-1 justify-between p-5">

                                <div>

                                    <div className="flex gap-2 mb-2">
                                        {group.muscleGroups.map(
                                            (
                                                muscle: string,
                                                index: number
                                            ) => (
                                                <span
                                                    key={index}
                                                    className="rounded-full bg-[#C2F800] px-2 py-1 text-[9px] font-bold uppercase text-black"
                                                >
                                                    {muscle}
                                                </span>
                                            )
                                        )}
                                    </div>

                                    <h2
                                        className={`text-xl font-bold ${
                                            group.isDone
                                                ? 'line-through'
                                                : ''
                                        }`}
                                    >
                                        {group.name}
                                    </h2>

                                    <div className="mt-3 flex gap-5 text-sm text-gray-500">

                                        <span className="flex items-center gap-2">
                                            <FaClock />
                                            {group.duration} min
                                        </span>

                                        <span className="flex items-center gap-2">
                                            <FaFire />
                                            {group.caloriesBurned} kcal
                                        </span>

                                    </div>

                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-3">

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
                                        <FaTrash />
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