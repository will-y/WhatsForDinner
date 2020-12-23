import { Component } from '@angular/core';
import {MealService} from './services/meal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WhatsForDinner';
  constructor(private mealService: MealService) {

  }
}
