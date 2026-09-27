
import Image from 'next/image';
import WorkoutActions from '@/src/app/components/fixed/WorkoutActions';
import { IgroupsCard } from '@/type/type';

const getGroupDetails = async (id: string) => {
    const response = await fetch(
        'https://api.api-store.workers.dev/api/fitlog'
    );

    if (!response.ok) {
        throw new Error('Failed to fetch groups');
    }

    const groups: IgroupsCard[] = await response.json();

    const group = groups.find(
        (item) => String(item.id) === String(id)
    );

    return group;
};

const GroupDetails = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;

    const group = await getGroupDetails(id);

    if (!group) {
        return (
            <div className="container mx-auto px-6 py-10">
                <h1 className="text-2xl font-bold text-center">
                    Page details not found
                </h1>
            </div>
        );
    }

    return (
        <main className="container mx-auto px-6 py-10">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">

                <div>
                    <Image
                        src={group.image}
                        alt={group.name}
                        width={700}
                        height={500}
                        className="w-full rounded-xl object-cover"
                    />
                </div>

                <div>

                    <h1 className="text-4xl font-bold mb-2">
                        {group.name}
                    </h1>

                    <p className="mb-4 text-gray-400">
                        {group.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {group.muscleGroups.map(
                            (muscle: string, index: number) => (
                                <span
                                    key={index}
                                    className="rounded-full bg-[#b6f500] px-3 py-1 text-xs font-bold uppercase text-black"
                                >
                                    {muscle}
                                </span>
                            )
                        )}
                    </div>


                    <div className="mt-6">
                        <p className="flex justify-between rounded-t-lg border border-gray-700 bg-base-300/60 px-4 py-3 text-gray-300">
                            <strong className="text-gray-400">EQUIPMENT</strong>
                            <span>{group.equipment}</span>
                        </p>

                        <p className=" flex justify-between border border-gray-700 bg-base-300/60 px-4 py-3 text-gray-300">
                            <strong className="text-gray-400">DIFFICULTY</strong>
                            <span>{group.difficulty}</span>
                        </p>

                        <p className=" flex justify-between border border-gray-700 bg-base-300/60 px-4 py-3 text-gray-300">
                            <strong className="text-gray-400">SETS</strong>
                            <span>{group.sets}</span>
                        </p>

                        <p className=" flex justify-between border border-gray-700 bg-base-300/60 px-4 py-3 text-gray-300">
                            <strong className="text-gray-400">REPS</strong>
                            <span>{group.reps}</span>
                        </p>

                        <p className=" flex justify-between border border-gray-700 bg-base-300/60 px-4 py-3 text-gray-300">
                            <strong className="text-gray-400">DURATION</strong>
                            <span>{group.duration} min</span>
                        </p>

                        <p className=" flex justify-between border border-gray-700 bg-base-300/60 px-4 py-3 text-gray-300">
                            <strong className="text-gray-400">CALORIES</strong>
                            <span>{group.caloriesBurned} kcal</span>
                        </p>

                        <p className="flex justify-between rounded-b-lg border border-gray-700 bg-base-300/60 px-4 py-3 text-gray-300">
                            <strong className="text-gray-400">RATING</strong>
                            <span>{group.rating}</span>
                        </p>
                    </div>

                    <h2 className="mt-8 text-2xl font-bold text-white">
                        INSTRUCTIONS
                    </h2>

                    <ol className="mt-4 list-decimal pl-5 text-gray-300">
                        {group.instructions.map(
                            (instruction: string, index: number) => (
                                <li
                                    key={index}
                                    className="mb-2"
                                >
                                    {instruction}
                                </li>
                            )
                        )}
                    </ol>

                    <WorkoutActions group={group} />

                </div>

            </div>

        </main>
    );
};

export default GroupDetails;

