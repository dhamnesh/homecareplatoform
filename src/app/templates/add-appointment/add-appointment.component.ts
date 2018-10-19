import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { AlertService } from "../../services/index";
import { CoreService } from '../../services/core.service';
import { ScriptLoaderService } from '../../services/script-loader.service';
import { Helpers } from '../../helpers';
import * as moment from 'moment';
declare let $: any;
@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html'
})
export class AddAppointmentComponent implements OnInit, AfterViewInit {
  public display: boolean = false;
  public roleId;
  public currentClient;
  public careGiversList: any;
  public activeId = 'appointment';
  public genderArray: any = [];
  public careGiversList2: any = [];
  public filteredSpecialities: any[];
  public caregiverSpecialities: any;
  public caregiverAvailabilities: any;
  public RoleName: any;
  public placeholder: any;
  public availabilities: any = [{ fromDate: '', fromTime: '', toTime: '', toDate: '', weekdays: [], user_id: 0, display_name: '' }];
  public rowNumbersCount = 1;
  public weekDay;
  public appointments: any = [{service_receiver: 0, service_provider: 0, service_plan: [], availabilities: []}];
  rangeDates: Date[];
  rangeTime: Date[];
  constructor(public _alertService: AlertService,
    public coreService: CoreService,
    public _script: ScriptLoaderService) { }

  ngOnInit() {
    this._alertService.toggleModal().subscribe(modalName => {
      if (modalName == 'add_appointment') {
        this.careGiversList = [];
        this.currentClient = {};
        this.roleId = 0;
        this.customOnInit();
        //this.compareCareGiver;
      }
    });
    this.getAssets();
    this.getUsers();
  }


  customOnInit() {
    
    let self = this;
    this.activeId = 'appointment';
    $(".temp.tab-pane.active").each(function () {
        self.activeId = $(this).attr('id');
    });
    this._alertService.getAsset().subscribe(asset => {
      this.currentClient = asset;
      // var _sortedAvailabilities = this.coreService.sortAvailabilities(this.currentClient.schedules);
      // _sortedAvailabilities.then(res=>{
      //   console.log("resssss>>>>>>>> " + JSON.stringify(res));
      //   //this.compareCareGiver(res);
      // }).catch(err=>{
      //   console.log(err);
      // })
    });
    
    this.display = true;
}

compareCareGiver(result){
  console.log("calling the api");
  let res:any = {};
  this.coreService.post('/compareClientAndCaregiverAvailability', result).subscribe((data) => {
    // console.log("then in compare clien and caregiver availability");
     //console.log(JSON.stringify(data.availability));

      res = data;
      var _avail = res.availability;
     for(var z = 0; z < _avail.length; z++){
        _avail[z].fromDate = this.coreService.convertTimeToDateFormat( _avail[z].fromDate);
        _avail[z].toDate = this.coreService.convertTimeToDateFormat( _avail[z].toDate);
        _avail[z].fromTime = this.coreService.convertTimeToDateFormat( _avail[z].fromTime);
        _avail[z].toTime = this.coreService.convertTimeToDateFormat( _avail[z].toTime);

        // for(var n = 0; n < _avail[z].weekDays.length; n++){
        //   console.log(n);
        //   if(!_avail[z].weekDays[n].user_id && !_avail[z].weekDays[n].display_name){
        //     _avail[z].weekDays[n].user_id = 0;
        //     _avail[z].weekDays[n].display_name = "";
        //   }
        // }
     }
     this.availabilities = _avail;
    // console.log(JSON.stringify(this.availabilities));
  }, (error) => {
      console.log(error);
  });
  // console.log
}

next() {
    if (($('.temp.tab-pane.active .form-control.ng-invalid:first').length > 0)) {
        $('#next-btn').addClass('disabled-button');
    }
    else {
        let self = this;
        $('#next-btn').removeClass('disabled-button');
        $('.temp.tab-pane.active').removeClass('active').next('.temp.tab-pane').addClass('active');
        $('.temp.tab-pane.active').each(function () {
            let id = $(this).attr('id');
            self.activeId = id;
            console.log(self.activeId);
        });
    }
}


back() {
    let self = this;
    $('.temp.tab-pane.active').removeClass('active').prev('.temp.tab-pane').addClass('active');
    $(".temp.tab-pane.active").each(function () {
        let id = $(this).attr('id');
        self.activeId = id;
    });
}


validateButton() {
    if ($('.temp.tab-pane.active .form-control.ng-invalid:first').length < 1 ) {
        $('#next-btn').removeClass('disabled-button');
    }
    $(".form-control").change(function () {
        if ($('.temp.tab-pane.active .form-control.ng-invalid:first').length < 1 ) {
            $('#next-btn').removeClass('disabled-button');
        }
    });
}


  getServiceProvider() {
    let role_id = this.roleId;
    for (let i = 0; i < this.careGiversList.length; i++) {
      if (role_id == this.careGiversList[i].role_id) {
        //console.log("the client" + JSON.stringify(this.careGiversList[i]));
        this.careGiversList2.push({ 'name': this.careGiversList[i].display_name, 'id': this.careGiversList[i].user_id });
      }
    }
  }
  getUsers() {
    this.coreService.get('/users').subscribe((data) => {
      this.careGiversList = data.user;
      this.getServiceProvider();
    }, (error) => {

    });
  }

  addRow() {
    this.availabilities.push({ fromDate: '', fromTime: '', toTime: '', toDate: '' });
        this.rowNumbersCount++;
    }
    deleteRow() {
        this.availabilities.pop({ fromDate: '', fromTime: '', toTime: '', toDate: '' });
        this.rowNumbersCount--;
    }


  getAssets() {
    this.coreService.get('/roles').subscribe((data) => {
      for (let i = 0; i < data.roles.length; i++) {
        if (data.roles[i].name == 'Caregiver') {
          this.roleId = data.roles[i].id;
          break;
        }
      }
    }, (error) => {

    });
    this.coreService.get('/weekday').subscribe((data) => {
      this.weekDay = data.weekday;
    }, (error) => {

    });
  }
  filterSpeciality(event) {
    let query = event.query;
    this.getSpecialities(query);
  }

  filterResult(query, specialities): any[] {
    let filtered: any[] = [];
    let speciality;
    let speciality2 = { description: '', service_id: 0 };
    for (let i = 0; i < specialities.service.length; i++) {
      speciality = specialities.service[i];
      if (speciality.description.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        speciality2.description = speciality.description;
        speciality2.service_id = speciality.service_id;
        filtered.push(speciality2);
      }
    }
    return filtered;
  }
  getSpecialities(query) {
    this.coreService.get('/services').subscribe((data) => {
      this.filteredSpecialities = this.filterResult(query, data);
    }, (error) => {

    });
  }
  selectedCareGiver(ev) {
    //console.log(ev);
    this.getCareGiverData(ev.id);
  }
  getCareGiverData(userId) {
    //console.log('called', userId);
    this.coreService.get('/getUserById/' + userId).subscribe((data) => {
    //  console.log(data.user[0]);
      this.caregiverSpecialities = data.user[0].service;
      //console.log(this.caregiverSpecialities);
    }, (error) => {

    });
  }
  ngAfterViewInit() {
    this.loadScript();
  }
  loadScript() {
    this._script.loadScripts('app-add-appointment',
      ['assets/demo/default/custom/components/forms/widgets/bootstrap-datetimepicker.js']);
  }

  addAppointment(){
    console.log(this.currentClient.user_id);

    console.log("add Appointment submit function");
    //console.log("the availabilities" + JSON.stringify(this.availabilities));
    this.appointments[0].service_receiver = this.currentClient.user_id;
    this.appointments[0].service_plan = this.currentClient.service;
    this.appointments[0].availabilities = this.availabilities;

    console.log("appointments" + JSON.stringify(this.appointments));

    var _appointments = this.appointments[0].availabilities;

    for(var z = 0; z < _appointments.length;z++){
      _appointments[z].fromDate = this.coreService.convertDateToTimeFormat(_appointments[z].fromDate);
      _appointments[z].toDate = this.coreService.convertDateToTimeFormat(_appointments[z].toDate);
      _appointments[z].fromTime = this.coreService.convertDateToTimeFormat(_appointments[z].fromTime);
      _appointments[z].toTime = this.coreService.convertDateToTimeFormat(_appointments[z].toTime);
    }

    this.appointments[0].availabilities = _appointments;
    console.log("this.appointments" + JSON.stringify(this.appointments)); 

    this.coreService.post('/add_appointments', this.appointments).subscribe((data) => {
      console.log("appointment created succesfully");
    }, (error) => {
        console.log(error);
    });
  }

  addCareGiver(ev, wd){
    this.currentClient.ServiceProviderId = ev;
    //console.log(this.currentClient);
    console.log(ev);
    // console.log(wd);
  }
}
