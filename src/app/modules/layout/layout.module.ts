import { NgModule } from '@angular/core';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { UserModule } from '../user/user.module';
import { AdminModule } from '../admin/admin.module';
import { DataService } from '../../services/data.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import { DefaultComponent } from './default/default.component'; 
import {ScrollTopComponent} from '../../components/scroll-top/scroll-top.component';
import {TooltipsComponent} from '../../components/tooltips/tooltips.component';
import { AlertService } from '../../services/alert.service';
import { SharedModule } from '../shared/shared.module'; 

@NgModule({
    imports: [
        LayoutRoutingModule,
        DashboardModule,
        UserModule,
        AdminModule,
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        ScrollTopComponent,
        TooltipsComponent,
        DefaultComponent
    ],
    providers: [
        DataService,
        AlertService
    ]
})
export class LayoutModule { }
