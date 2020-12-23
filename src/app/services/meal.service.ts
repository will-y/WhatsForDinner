import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Meal} from '../model/meal';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  constructor(private http: HttpClient) {
  }

  getMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>('http://localhost:8080/meals/', {headers: {header: 'Access-Control-Allow-Origin: *'}});
  }

  addMeal(meal: object): void {
    this.http.post('http://localhost:8080/meal', meal, {headers: {header: 'Access-Control-Allow-Origin: *'}}).subscribe();
  }
}
