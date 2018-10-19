import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../services/core.service';
import { AuthService } from '../../components/guard';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  constructor(private authService: AuthService, public coreService: CoreService) {

  }

  ngOnInit() {

  }
}
