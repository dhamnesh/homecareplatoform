import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimesheetRoutingModule } from './timesheet-routing.module';
import { TimesheetComponent } from './timesheet.component';

@NgModule({
  imports: [
    CommonModule,
    TimesheetRoutingModule
  ],
  declarations: [TimesheetComponent]
})
export class TimesheetModule { }
