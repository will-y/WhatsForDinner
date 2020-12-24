import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MealService} from '../services/meal.service';
import {Meal} from '../model/meal';
import {DateService} from '../services/date.service';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']
})
export class RecipeSearchComponent implements OnInit {
  @Output() clickedMeal = new EventEmitter<Meal>();
  @Output() deleteMeal = new EventEmitter<Meal>();

  search: string;
  meals: Meal[];
  showMeals = false;
  sortedMeals: Meal[];

  constructor(private mealService: MealService, private dateService: DateService) { }

  ngOnInit(): void {
    this.mealService.getMeals().subscribe(x => {
      // @ts-ignore
      this.meals = x.meals.sort(this.mealCompareFunction);
      this.sortedMeals = this.meals;
      this.showMeals = true;
    });
  }

  onSearchChange(): void {
    if (this.search) {
      this.sortedMeals = this.meals.filter(meal => {
        return meal.name.toLowerCase().includes(this.search.toLowerCase());
      });
    } else {
      this.sortedMeals = this.meals;
    }
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
    this.clickedMeal.emit(meal);
  }

  onDeleteMeal(meal: Meal): void {
    this.dateService.deleteMeal(meal._id);
    this.meals = this.meals.filter(element => element !== meal);
    this.onSearchChange();
    this.deleteMeal.emit(meal);
  }
 }
