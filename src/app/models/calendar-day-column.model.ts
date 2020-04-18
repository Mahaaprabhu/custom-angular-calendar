import { CalendarCell } from './calendar-cell.model';

export class CalendarDayColumn {
    calendarDayStr: string;
    calendarDayIndex: number;
    calendareCells: CalendarCell[];

    constructor(calendarDayStr: string, calendarDayIndex: number) {
        this.calendarDayStr = calendarDayStr;
        this.calendarDayIndex = calendarDayIndex;
        this.calendareCells = []; 
    }
}