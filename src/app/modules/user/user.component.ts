import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../services/core.service';
import { AuthService } from '../../components/guard';


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public coreService: CoreService, private authService: AuthService) {
  }

  ngOnInit() {

  }
}

