import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DefaultComponent } from './default/default.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '', component: DefaultComponent,
                children: [
                    { path: 'dashboard', component: DashboardComponent },
                    {
                        path: 'user',
                        loadChildren: '../user/user.module#UserModule',
                    },
                    {
                        path: 'appointments',
                        loadChildren: '../appointments/appointments.module#AppointmentsModule',
                    },
                    {
                        path: 'timesheet',
                        loadChildren: '../timesheet/timesheet.module#TimesheetModule',
                    }
                ]
            }

        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
