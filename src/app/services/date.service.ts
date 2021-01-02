import { Injectable } from '@angular/core';
import {DayPlan} from '../model/day-plan';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(private http: HttpClient) { }

  getWeeklyMealPlan(day: number, month: number, year: number): Observable<DayPlan[]> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const params = new HttpParams().append('day', day.toString()).append('month', month.toString()).append('year', year.toString());

    return this.http.get<DayPlan[]>(environment.api_url + '/get-plan', {params});
  }

  addMealToPlan(day: number, month: number, year: number, meal: object): Observable<object> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const params = new HttpParams().append('day', day.toString()).append('month', month.toString()).append('year', year.toString());

    return this.http.post(environment.api_url + '/add-plan', meal, {headers, params, responseType: 'json'});
  }

  removeMealFromPlan(day: number, month: number, year: number, mealId: string): void {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const params = new HttpParams().append('day', day.toString()).append('month', month.toString()).append('year', year.toString()).append('meal', mealId);

    this.http.put(environment.api_url + '/remove-meal-from-plan', {}, {headers, params}).subscribe();
  }

  deleteMeal(mealId: string): void {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const params = new HttpParams().append('meal', mealId);

    this.http.delete(environment.api_url + '/delete-meal', {headers, params}).subscribe();
  }
}
