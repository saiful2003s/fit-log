'use client';

import { FaCalendarPlus, FaRegBookmark } from 'react-icons/fa';
import { usePlan } from '../../context/PlanContext';
import { IgroupsCard } from '@/type/type';


const WorkoutActions = ({
    group,
}: {
    group: IgroupsCard;
}) => {
    const {
        addToPlan,
        addToSaved,
        plan,
        saved,
    } = usePlan();

    const alreadyInPlan = plan.some(
        (item) => item.id === group.id
    );

    const alreadySaved = saved.some(
        (item) => item.id === group.id
    );

    return (
        <div className="mt-8 flex gap-4">

            <button
                onClick={() => addToPlan(group)}
                disabled={alreadyInPlan}
                className="btn bg-[#C2F800] text-black border-none px-6"
            >
                <FaCalendarPlus />

                {alreadyInPlan
                    ? "Added to today's plan"
                    : "Add to today's plan"}
            </button>

            <button
                onClick={() => addToSaved(group)}
                disabled={alreadySaved}
                className="btn bg-transparent border border-gray-700 text-gray-200 px-6"
            >
                <FaRegBookmark />

                {alreadySaved
                    ? 'Saved'
                    : 'Save for later'}
            </button>

        </div>
    );
};

export default WorkoutActions;