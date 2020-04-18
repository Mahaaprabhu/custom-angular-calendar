import { CalendarCell } from './calendar-cell.model';
import { DateUtilService } from '../services/date-util.service';
import { CalendarDayColumn } from './calendar-day-column.model';

export class CalendarMeta {
    year: number;
    monthIndex: number;
    monthStr: string;
    dayColumns: CalendarDayColumn[];

    constructor() {
        let date: Date = new Date();
        this.year = date.getFullYear();
        this.monthIndex = date.getMonth();
        this.monthStr = (new DateUtilService()).getMonthStr(date.getMonth());
        this.dayColumns = [];
    }
}