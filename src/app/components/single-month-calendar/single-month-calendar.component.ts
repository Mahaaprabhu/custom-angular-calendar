import { Component, OnInit } from '@angular/core';
import { CalendarCell } from 'src/app/models/calendar-cell.model';
import { CalendarMeta } from 'src/app/models/calendar-meta.model';
import { DateUtilService } from 'src/app/services/date-util.service';
import { CalendarDayColumn } from 'src/app/models/calendar-day-column.model';

@Component({
  selector: 'app-single-month-calendar',
  templateUrl: './single-month-calendar.component.html',
  styleUrls: ['./single-month-calendar.component.scss']
})
export class SingleMonthCalendarComponent implements OnInit {
  calendarMeta: CalendarMeta = new CalendarMeta();
  selectedDates: number[] = [];
  showSelectedDates: boolean = false;

  year: number = (new Date()).getFullYear();
  month: number = (new Date()).getMonth() + 1;

  constructor(private dateUtilService: DateUtilService) { 
    this.onGenerateCustomCalendar(this.year+'-'+this.month);
  }

  ngOnInit(): void {
  }

  public onGenerateCustomCalendar(yearAndMonth: string): void {
    this.year = (new Date()).getFullYear();
    this.month = (new Date()).getMonth() + 1;
    if(yearAndMonth) {
      this.year = Number(yearAndMonth.split('-')[0]);
      this.month = Number(yearAndMonth.split('-')[1]);
    }
    this.generateCalendarCells();
  }

  private generateCalendarCells() {
    const startDayOfMonth = (new Date(this.year, this.month - 1, 1)).getDay();
    const todalDaysOfMonth =  (new Date(this.year, this.month, 0)).getDate();
    
    this.calendarMeta = new CalendarMeta();
    this.calendarMeta.monthIndex = this.month -1;
    this.calendarMeta.monthStr = this.dateUtilService.getMonthStr(this.month -1);
    this.calendarMeta.year = this.year;
    this.calendarMeta.dayColumns = [
      new CalendarDayColumn('Sun', 0), //Sundays
      new CalendarDayColumn('Mon', 1), //Mondays
      new CalendarDayColumn('Tue', 2), //Tuesdays
      new CalendarDayColumn('Wed', 3), //Wednesdays
      new CalendarDayColumn('Thu', 4), //Thursdays
      new CalendarDayColumn('Fri', 5), //Fridays
      new CalendarDayColumn('Sat', 6)  //Saturdays
    ];


    /*
    * Iterate each weak (row) and set the cells
    */
   let pointer = 0;
   let dateCounter = 0;
    for(let row=0; row<=5; row++) {
      for(let column=0; column<=6; column++) {
        let calendarCell: CalendarCell = new CalendarCell();
        
        //Skip extra cells
        if(pointer < startDayOfMonth || dateCounter >= todalDaysOfMonth) {
          calendarCell.inScope = false;
        }else {
          dateCounter++;
          calendarCell.date = dateCounter;
        }

        //randomly disabling some columns for demonstration purpose
        if(dateCounter == 13 || dateCounter == 20 || dateCounter == 21 || column == 3) {
          calendarCell.disabled = true;
        }
        calendarCell.id = `r${row}-c${column}`;
        (this.calendarMeta.dayColumns[column]).calendareCells[row] = calendarCell;
        pointer++;
      }
    }

    console.log(this.calendarMeta);
    
  }

  public onCellSelect(cellId: string) {
    if(!cellId) {
      return;
    }
    const columnIndex: number = Number (cellId.split('-')[1].replace('c', ''));
    const rowIndex: number = Number (cellId.split('-')[0].replace('r', ''));
    if(!(columnIndex || rowIndex || this.calendarMeta || this.calendarMeta
      .dayColumns[columnIndex] || this.calendarMeta
      .dayColumns[columnIndex]
      .calendareCells[rowIndex])) {
      return;
    }
    const selectedCell = this.calendarMeta
                              .dayColumns[columnIndex]
                              .calendareCells[rowIndex];
    if(selectedCell.disabled || !selectedCell.inScope) {
      return;
    }else{
      //Swap the state
      selectedCell.selected = !selectedCell.selected;
      this.calendarMeta.dayColumns[columnIndex]
                      .calendareCells[rowIndex] = selectedCell;
    }

  }

  /*
    * If any unselected selectable cell is present,
    * then select all the selectable cells,
    * or else, unselect all
  */
  public onColumnSelect(columnIndex: number) {
    const selectedColumn: CalendarDayColumn = this.calendarMeta.dayColumns[columnIndex];
    
    let selectablesPresent: boolean = false;
    for(let cell of selectedColumn.calendareCells) {
      if(cell.inScope && !cell.disabled && !cell.selected) {
        selectablesPresent = true;
        break;
      }
    }

    for(let i=0; i<selectedColumn.calendareCells.length; i++) {
      let cell = selectedColumn.calendareCells[i]
      if(cell.inScope && !cell.disabled) {
        if(selectablesPresent) {
          cell.selected = true;
        }else {
          cell.selected = false;
        }
      }
      selectedColumn.calendareCells[i] = cell;
    }

    this.calendarMeta.dayColumns[columnIndex] = selectedColumn;

  }

  public onSelectAll() {
    this.calendarMeta.dayColumns.map(dayColumns => {
      return dayColumns.calendareCells.map(cell => {
        if(!cell.disabled && cell.inScope) {
          cell.selected = true;
        }
        return cell;
      })
    })
  }

  public onDeSelectAll() {
    this.calendarMeta.dayColumns.map(dayColumns => {
      return dayColumns.calendareCells.map(cell => {
        if(!cell.disabled && cell.inScope) {
          cell.selected = false;
        }
        return cell;
      })
    })
  }

  public onSubmit() {
    this.selectedDates = [];
    for(let dayColumn of this.calendarMeta.dayColumns) {
      for(let cell of dayColumn.calendareCells) {
        if(cell.inScope && !cell.disabled && cell.selected) {
          this.selectedDates.push(cell.date);
        }
      }
    }
    this.selectedDates = this.selectedDates.sort((d1, d2) => d1 - d2);
    this.showSelectedDates = true;
    setTimeout(()=>{
      this.showSelectedDates = false;
    }, 10 * 1000);
  }

}
