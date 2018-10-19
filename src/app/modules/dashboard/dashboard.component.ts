import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { CoreService } from '../../services/core.service';
import { Helpers } from '../../helpers';
import { ScriptLoaderService } from '../../services/script-loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  data: any;

  constructor(private coreService: CoreService, private _script: ScriptLoaderService) {
    this.data = {
            labels: ['A','B','C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
            };
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this._script.loadScripts('app-index',
      ['assets/app/js/dashboard.js']);
  }

}
