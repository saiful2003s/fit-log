interface IgroupsCard {
    id: number;
    name: string;
    image: string;
    muscleGroups: string[];
    equipment: string;
    difficulty: string;
    duration: number;
    caloriesBurned: number;
    sets: number;
    reps: string;
    rating: number;
    description: string;
    instructions: [
        string,
        string,
        string,
        string
    ];
    isDone?: boolean;
}

export type { IgroupsCard };