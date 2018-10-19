import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AlertService } from '../../services/alert.service';
import { AlertComponent } from '../../directives/alert.component';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    AlertComponent
  ],
  providers: [AlertService],
  entryComponents: [AlertComponent],
})
export class LoginModule { }
