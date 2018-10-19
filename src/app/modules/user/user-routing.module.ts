import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CareGiverComponent } from './care-giver/care-giver.component';
import { ClientComponent } from './client/client.component';
import { EditUserComponent } from './edit-user/edit-user.component';
const routes: Routes = [ 
    { path: 'care-giver', component: CareGiverComponent },
    { path: 'client', component: ClientComponent },
    { path: 'edit/:id', component: EditUserComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
