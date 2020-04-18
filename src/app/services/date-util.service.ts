import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtilService {

  months: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' 
  ];

  constructor() { }

  public getMonthStr(monthIndex: number): string {
    return this.months[monthIndex];
  }
}
