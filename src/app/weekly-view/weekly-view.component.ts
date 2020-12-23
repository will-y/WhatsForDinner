import { Component, OnInit } from '@angular/core';
import {DateService} from '../services/date.service';
import {DayPlan} from '../model/day-plan';
import {Meal} from '../model/meal';

@Component({
  selector: 'app-weekly-view',
  templateUrl: './weekly-view.component.html',
  styleUrls: ['./weekly-view.component.css']
})
export class WeeklyViewComponent implements OnInit {
  currentWeek: DayPlan[] = [];
  currentWeekDates: Date[];
  active = -1;
  showList = false;
  showCreate = false;

  constructor(private dateService: DateService) { }

  ngOnInit(): void {
    const startDate = this.closestMonday();
    this.currentWeekDates = this.getCurrentWeekDates(startDate);
    this.dateService.getWeeklyMealPlan(startDate.getDate(), startDate.getMonth(), startDate.getFullYear()).subscribe(x => {
      // @ts-ignore
      this.currentWeek = x.plan;
      this.currentWeek.forEach(element => {
        if (element.meals) {
          element.meals.sort(this.mealCompareFunction);
        }
      });
    });
  }

  closestMonday(): Date {
    const today = new Date();
    const day = today.getDay();

    today.setDate(today.getDate() - day + 1);

    return today;
  }

  getCurrentWeekDates(monday: Date): Date[] {
    const result: Date[] = [];

    for (let i = 0; i < 7; i++) {
      result[i] = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
    }

    return result;
  }

  onAddClicked(index: number): void {
    if (this.active === index) {
      this.active = -1;
      this.showList = false;
      this.showCreate = false;
    } else {
      this.active = index;
      this.showList = true;
    }
  }

  onCreateNewClicked(): void {
    this.showCreate = !this.showCreate;
  }

  onClickRemoveMeal(mealId: string, day: number, month: number, year: number): void {
    this.dateService.removeMealFromPlan(day, month, year, mealId);
    const currentDay = this.currentWeek.find(element => {
      return element.day === day && element.month === month && element.year === year;
    });

    currentDay.meals.splice(currentDay.meals.findIndex(element => element._id === mealId), 1);
  }

  mealCompareFunction(a: Meal, b: Meal): number {
    if (a.category === 'Main') {
      return -1;
    } else if (b.category === 'Main') {
      return 1;
    } else if (a.category === 'Side') {
      return -1;
    } else {
      return 1;
    }
  }

  onMealClicked(meal: Meal): void {
    const tempDate = this.currentWeekDates[this.active];
    if (!this.currentWeek[this.active].meals.find((
        element => element.name === meal.name && element.link === meal.link && element.category && meal.category))) {
      this.currentWeek[this.active].meals.push(meal);
      this.currentWeek[this.active].meals.sort(this.mealCompareFunction);
    }
    const mealObject = {
      name: meal.name,
      link: meal.link,
      count: 0,
      lastUsed: new Date(),
      category: meal.category
    };
    this.dateService.addMealToPlan(tempDate.getDate(), tempDate.getMonth(), tempDate.getFullYear(), mealObject);
  }

}