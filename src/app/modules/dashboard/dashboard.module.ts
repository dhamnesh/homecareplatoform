import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {KeysPipe} from '../../pipes/keys.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    KeysPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ]
})
export class DashboardModule {
}
