import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Meal} from '../model/meal';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  constructor(private http: HttpClient) {
  }

  getMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(environment.api_url + '/meals', {headers: {header: 'Access-Control-Allow-Origin: *'}});
  }

  addMeal(meal: object): void {
    this.http.post(environment.api_url + '/meal', meal, {headers: {header: 'Access-Control-Allow-Origin: *'}}).subscribe();
  }
}
