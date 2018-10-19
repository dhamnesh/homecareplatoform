import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../helpers';
import { Router } from '@angular/router';
import { CoreService } from '../../services/core.service';
import { AuthService } from '../../components/guard';

declare let mLayout: any;

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit, AfterViewInit {

    public currentUser = JSON.parse(sessionStorage.$SM$currentUserData);
    public profileIcon;
    constructor(public router: Router, public coreService: CoreService, public authService: AuthService) {

    }
    ngOnInit() {
        this.profileIcon = this.currentUser.display_name.charAt(0);
        //console.log("this.currentUser" + JSON.stringify(this.currentUser));
    }
    ngAfterViewInit() {
        mLayout.initHeader();
    }
    logout() {
        this.coreService.get('/logout').subscribe((res) => {
            this.authService.clearUser();
            this.authService.clearStorage();
            this.router.navigate(['/login']);
            localStorage.clear();
            sessionStorage.clear();
        });
    }

}
