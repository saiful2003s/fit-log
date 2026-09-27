'use client';

import { toast } from 'react-toastify';
import { FaCalendarPlus, FaBookmark } from 'react-icons/fa';

import { usePlan } from '../../context/PlanContext';
import { IgroupsCard } from '@/type/type';


interface WorkoutActionsProps {
    group: IgroupsCard;
}



const WorkoutActions = ({ group }: WorkoutActionsProps) => {

    const {
        plan,
        saved,
        addToPlan,
        addToSaved,
    } = usePlan();

    const handleAddToPlan = () => {
        const alreadyAdded = plan.some(
            (item) => item.id === group.id
        );

        if (alreadyAdded) {
            toast.warning(`Already in your plan`);
            return;
        }

        addToPlan(group);
        toast.success(`Added to your plan`);
    };

    const handleSave = () => {
        const alreadySaved = saved.some(
            (item) => item.id === group.id
        );

        if (alreadySaved) {
            toast.warning(`Already saved`);
            return;
        }

        addToSaved(group);
        toast.success(`Saved`);
    };

    return (
        <div className="mt-8 flex gap-3 justify-center md:justify-start">

            <button
                onClick={handleAddToPlan}
                className="btn border-none bg-[#C2F800] text-black"
            >
                <FaCalendarPlus />
                Add to today's plan
            </button>

            <button
                onClick={handleSave}
                className="btn border-gray-600 bg-transparent"
            >
                <FaBookmark />
                Save for later
            </button>

        </div>
    );
};

export default WorkoutActions;