import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    SharedModule
  ],
  declarations: [AppointmentsComponent]
})
export class AppointmentsModule { }
