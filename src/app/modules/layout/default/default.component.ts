import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Helpers } from '../../../helpers';
import { Router } from '@angular/router';

@Component({
  selector: '.m-grid__item.m-grid__item--fluid.m-grid.m-grid--ver-desktop.m-grid--desktop.m-body',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DefaultComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    if (this.router.url === '/') {
      this.router.navigate(['/dashboard']);
  }
  }

}
