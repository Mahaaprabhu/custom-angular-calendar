import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SingleMonthCalendarComponent } from './components/single-month-calendar/single-month-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    SingleMonthCalendarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
