'use client';

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import { IgroupsCard } from '@/type/type';

interface PlanContextType {
    plan: IgroupsCard[];
    saved: IgroupsCard[];

    addToPlan: (group: IgroupsCard) => void;
    addToSaved: (group: IgroupsCard) => void;

    removeFromPlan: (id: number) => void;
    removeFromSaved: (id: number) => void;

    toggleDone: (id: number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(
    undefined
);

export const PlanProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [plan, setPlan] = useState<IgroupsCard[]>([]);
    const [saved, setSaved] = useState<IgroupsCard[]>([]);

    useEffect(() => {
        const savedPlan = localStorage.getItem('fitlog-plan');
        const savedItems = localStorage.getItem('fitlog-saved');

        if (savedPlan) {
            setPlan(JSON.parse(savedPlan));
        }

        if (savedItems) {
            setSaved(JSON.parse(savedItems));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('fitlog-plan', JSON.stringify(plan));
    }, [plan]);

    useEffect(() => {
        localStorage.setItem('fitlog-saved', JSON.stringify(saved));
    }, [saved]);

    const addToPlan = (group: IgroupsCard) => {
        setPlan((current) => {
            const alreadyExists = current.some(
                (item) => item.id === group.id
            );

            if (alreadyExists) {
                return current;
            }

            return [...current, group];
        });
    };

    const addToSaved = (group: IgroupsCard) => {
        setSaved((current) => {
            const alreadyExists = current.some(
                (item) => item.id === group.id
            );

            if (alreadyExists) {
                return current;
            }

            return [...current, group];
        });
    };

    const removeFromPlan = (id: number) => {
        setPlan((current) =>
            current.filter((item) => item.id !== id)
        );
    };

    const removeFromSaved = (id: number) => {
        setSaved((current) =>
            current.filter((item) => item.id !== id)
        );
    };

    const toggleDone = (id: number) => {
        setPlan((current) =>
            current.map((item) =>
                item.id === id
                    ? { ...item, isDone: !item.isDone }
                    : item
            )
        );
    };

    return (
        <PlanContext.Provider
            value={{
                plan,
                saved,
                addToPlan,
                addToSaved,
                removeFromPlan,
                removeFromSaved,
                toggleDone,
            }}
        >
            {children}
        </PlanContext.Provider>
    );
};

export const usePlan = () => {
    const context = useContext(PlanContext);

    if (!context) {
        throw new Error(
            'usePlan must be used inside PlanProvider'
        );
    }

    return context;
};