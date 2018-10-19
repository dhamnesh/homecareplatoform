import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { CoreService } from '../../../services/core.service';
export interface Car {
  Name;
  Address;
  Availability;
  Speciality;
}
@Component({
  selector: 'app-care-giver',
  templateUrl: './care-giver.component.html',
  styleUrls: ['./care-giver.component.css']
})
export class CareGiverComponent implements OnInit {

  // public careGiverList: any;
  public order: string = 'first_name';
  public roleId: number;
  cols: any[];
  na: string = "Not available";
  public careGiverList:any = [];
  public toggle:boolean = false;
  constructor(public alertService: AlertService, public coreService: CoreService) {
    this.cols = [
      { field: '#', header: '#' },
      { field: 'display_name', header: 'Name' },
      { field: 'address', header: 'Address' },
      { field: 'Appointments', header: 'Appointments' },
      { field: 'service', header: 'Speciality' }
    ];
    this.getAssets();
    this.getUsers();
  }

  userFilter: any;
  ngOnInit() {
    this.alertService.toggleModal().subscribe(modalName => {
      this.careGiverList = [];
      this.getAssets();
      this.getUsers();
    });

    this.alertService.observeRefreshInit().subscribe(flag => {
      this.careGiverList = [];
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
          this.careGiverList.push(_dummylist[i]);
        }
      }
      // this.careGiverList = _dummylist;
      // this.careGiverList.shift();
      this.toggle = true;
      // 
    }, (error) => {

    });
  }
  getAssets() {
    this.coreService.get('/roles').subscribe((data) => {
      for (let i = 0; i < data.roles.length; i++) {
        if (data.roles[i].name == 'Caregiver') {
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
