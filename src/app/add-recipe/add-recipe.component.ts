import {Component, Input, OnInit} from '@angular/core';
import {MealService} from '../services/meal.service';
import {DateService} from '../services/date.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  @Input() day: number;
  @Input() month: number;
  @Input() year: number;

  name: string;
  link: string;
  category = 'Main';
  alert = false;

  constructor(private mealService: MealService, private dateService: DateService) { }

  ngOnInit(): void {
    this.mealService.getMeals().subscribe(result => {
      console.log(result);
    });
  }

  onFormSubmit(): void {
    if (this.name && this.name !== '') {
      this.alert = false;
      const meal = {
        name: this.name,
        link: this.link,
        count: 0,
        lastUsed: new Date(),
        category: this.category
      };
      if (this.day && this.month && this.year) {
        this.dateService.addMealToPlan(this.day, this.month, this.year, meal);
      } else {
        this.mealService.addMeal(meal);
      }

      setTimeout(() => window.location.reload(), 1000);

    } else {
      this.alert = true;
    }
  }

}
