import {NgModule} from '@angular/core';
import { UserComponent } from './user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { CareGiverComponent } from './care-giver/care-giver.component';
import { ClientComponent } from './client/client.component';
import { SharedModule } from '../shared/shared.module';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    UserComponent,
    CareGiverComponent,
    ClientComponent,
    EditUserComponent
  ],
    imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule,
    FileUploadModule
  ],
})
export class UserModule {

}
