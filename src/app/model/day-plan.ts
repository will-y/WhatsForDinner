import {Meal} from './meal';

export interface DayPlan {
    _id: string;
    day: number;
    month: number;
    year: number;
    meals: Meal[];
}
