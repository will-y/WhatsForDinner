import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {MealService} from '../services/meal.service';
import {DateService} from '../services/date.service';
import {Meal} from '../model/meal';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  @Input() day: number;
  @Input() month: number;
  @Input() year: number;

  @Output() addRecipe = new EventEmitter<object>();

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
      const temp = {
        day: this.day,
        month: this.month,
        year: this.year,
        meal
      };
      this.addRecipe.emit(temp);

      // setTimeout(() => window.location.reload(), 1000);

    } else {
      this.alert = true;
    }
  }

}
