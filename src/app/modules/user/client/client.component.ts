import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../../services/core.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  public clientList: any = [];
  public roleId: number;
  userFilter: any;
  cols: any[];
  public toggle:boolean = false;
  na: string = "Not available";
  constructor(public coreService: CoreService, public alertService: AlertService) {
    this.cols = [
      { field: '#', header: '#' },
      { field: 'display_name', header: 'Name' },
      { field: 'address', header: 'Address' },
      { field: 'Availability', header: 'Appointments' },
      { field: 'service', header: 'Care Plan' }
    ];
	  this.getAssets();
    this.getUsers();
  }

  ngOnInit() {
    this.alertService.toggleModal().subscribe(modalName => {
      this.clientList = [];
      this.getAssets();
      this.getUsers();
    });

    this.alertService.observeRefreshInit().subscribe(flag => {
      this.clientList = [];
      this.getAssets();
      this.getUsers();
   });
   
  }
  getUsers() {
    this.coreService.get('/users').subscribe((data) => {
      let _dummylist = data.user;
      //console.log("dummylist>>>>>>>" + JSON.stringify(_dummylist));


      // console.log()
      // for(let i = 0; i < _dummylist.length; i++){
      //   this.coreService.sortAvailabilities(_dummylist[i].availability);
      // }
      
      // console.log("dummylist>>>>>>>2>>>" + JSON.stringify(_dummylist));

      //  var a = this.coreService.sortAvailabilities(_dummylist[8].availability);
      for(let i = 0; i < _dummylist.length; i++){
        if(_dummylist[i].roles[0].id == this.roleId){
          this.clientList.push(_dummylist[i]);
        }
      }
      // this.clientList = _dummylist;
      // this.clientList.shift();
      this.toggle = true;
      // 
    }, (error) => {

    });
  }
  getAssets() {
    this.coreService.get('/roles').subscribe((data) => {
      for (let i = 0; i < data.roles.length; i++) {
        if (data.roles[i].name == 'Patient') {
          this.roleId = data.roles[i].id;
          this.userFilter = { role_id: this.roleId };
          break;
        }
      }
    }, (error) => {

    });
  }
  openAddCareGiverModal(modalName) {
    this.alertService.openModal(modalName, null);
  }


}
