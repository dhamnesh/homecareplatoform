import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderModule } from 'ngx-order-pipe';
import { DialogModule } from 'primeng/dialog';
import {StepsModule} from 'primeng/steps';
import {MenuItem} from 'primeng/api';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {MessageModule} from 'primeng/message';
import {MultiSelectModule} from 'primeng/multiselect';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { AddCareGiverComponent } from '../../templates/add-user/add-care-giver-modal.component';
import {FormsModule} from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {GrowlModule} from 'primeng/growl';
import {MessageService} from 'primeng/components/common/messageservice';
import { FileUploadModule } from 'ng2-file-upload';
import { AddAppointmentComponent } from '../../templates/add-appointment/add-appointment.component';
import { MomentModule } from 'ngx-moment';
import {TableModule} from 'primeng/table';
import {ScheduleModule} from 'primeng/schedule';

import {ChartModule} from 'primeng/chart';


@NgModule({
  imports: [
    CommonModule,
    OrderModule,
    DialogModule,
    MomentModule,
    AutoCompleteModule,
    DropdownModule,
    CalendarModule,
    MessageModule,
    MultiSelectModule,
    FilterPipeModule,
    FormsModule,
    ConfirmDialogModule,
    GrowlModule,
    FileUploadModule,
    TableModule,
    ScheduleModule,
    ChartModule

  ],
  exports: [
    OrderModule,
    DialogModule,
    MomentModule,
    AutoCompleteModule,
    DropdownModule,
    CalendarModule,
    MessageModule,
    MultiSelectModule,
    FilterPipeModule,
    FormsModule,
    AddCareGiverComponent,
    ConfirmDialogModule,
    GrowlModule,
    FileUploadModule,
    AddAppointmentComponent,
    TableModule,
    ScheduleModule,
    ChartModule

  ],
  declarations: [AddCareGiverComponent, AddAppointmentComponent],
  providers:[ConfirmationService, MessageService]
})
export class SharedModule { }
