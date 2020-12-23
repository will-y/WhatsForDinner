import { Injectable } from '@angular/core';
import {DayPlan} from '../model/day-plan';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(private http: HttpClient) { }

  getWeeklyMealPlan(day: number, month: number, year: number): Observable<DayPlan[]> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const params = new HttpParams().append('day', day.toString()).append('month', month.toString()).append('year', year.toString());

    return this.http.get<DayPlan[]>('http://localhost:8080/get-plan', {params});
  }

  addMealToPlan(day: number, month: number, year: number, meal: object): void {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const params = new HttpParams().append('day', day.toString()).append('month', month.toString()).append('year', year.toString());

    this.http.post('http://localhost:8080/add-plan', meal, {headers, params, responseType: 'json'}).subscribe();
  }

  removeMealFromPlan(day: number, month: number, year: number, mealId: string): void {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const params = new HttpParams().append('day', day.toString()).append('month', month.toString()).append('year', year.toString()).append('meal', mealId);

    this.http.put('http://localhost:8080/remove-meal-from-plan', {}, {headers, params}).subscribe();
  }
}
