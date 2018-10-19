import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from '../../../services/core.service';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { AlertService } from '../../../services/alert.service';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {
  public sub;
  public activeEdit: boolean = false;
  public userId;
  public updatedUserData: any = [];
  public userDetails: any;
  public activeTab: string = 'summary';
  public genderArray: any = [{ name: 'Male' }, { name: 'Female' }];
  public temp = [];
  public filteredSpecialities: any[];
  public rowNumbersCount = 1;
  public availabilities: any = [{ fromDate: '', fromTime: '', toTime: '', toDate: '' }];
  public weekdays;
  public specialities: any;
  public specialitiesCopy: any;
  public na: string = 'Not Available';
  public userRole: string;
  public userRoleArray: any;
  public sortedAvailabilites: any = [];
  public groupedAvailabilities: any = [{ from_date: '', start_time: '', end_time: '', to_date: '', weekdays: [] }];
  public existingAvailLength;
  public existingAvailFlag: boolean = false;
  public index = 0;
  public imageUrl;
  public serviceLength:number;
  public tooglee= false;
  public uploader: FileUploader = new FileUploader({
    url: 'http://192.168.0.69:3000/api/user/imageUpload',
    // itemAlias: 'profile_pic',
    method: 'POST',
    // allowedMimeType: this.allowedImageType,
    // maxFileSize: this.maxImageSize,
    autoUpload: false,
    removeAfterUpload: false,
    queueLimit: 1,
    parametersBeforeFiles: true
  });
  msgs: Message[] = [];
  loading: boolean = false;
  constructor(private _location: Location,
    private route: ActivatedRoute,
    private coreService: CoreService,
    public confirmationService: ConfirmationService,
    private messageService: MessageService,
    public alertService: AlertService) {
    this.sub = this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
    this.uploader.onAfterAddingFile = (fileItem) => {
      fileItem.withCredentials = false;
      console.log(fileItem.file.type);
      //this.uploadImages();

    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      //this.setLatestImage(response);
      // this.setLatestImage();
      //console.log(JSON.stringify(response));
    };
    this.imageUrl = this.coreService.url;

  }
  ngOnInit() {
    this.getAssets();
    this.getUser();
  }
  getUser() {
    this.coreService.get('/getUserById/' + this.userId).subscribe((data) => {
      this.userDetails = data.user[0];
      //console.log(this.userDetails);
      this.updatedUserData = Object.assign({}, this.userDetails);
      this.availabilities = this.updatedUserData.schedules;
      this.updatedUserData.gender = { 'name': this.updatedUserData.gender };
      this.sortAvailabilities();
      this.specialities = this.updatedUserData.services;
      this.serviceLength =  this.userDetails.services.length;
      this.specialitiesCopy = Object.assign([], this.specialities);
      let _d = JSON.parse(this.userDetails.dob);
      let d = new Date(_d);
      this.userDetails.dob = d;
      this.updatedUserData.dob = d;
      this.getUserRole();
    }, (error) => {
      
    });
  }

  toggleAction(ev) {
    //console.log(ev);
  }

  toggleTab(id) {
    if (id == 'summary') {
      this.activeTab = 'summary';
      this.activeEdit = false;
      $('.tab-pane.active').removeClass('active');
      $('#summary').addClass('active');
    }
    if (id == 'profile') {
      this.activeTab = 'profile';
      this.activeEdit = true;
      $('.tab-pane.active').removeClass('active');
      $('#profile').addClass('active');

    }
    if (id == 'edit-profile') {
      this.activeTab = 'edit-profile';
      this.activeEdit = false;
      $('.tab-pane.active').removeClass('active');
      $('#edit-profile').addClass('active');
    }
  }

  getSpecialities(query) {
    console.log(query);
    this.coreService.get('/services').subscribe((data) => {
      console.log("called the specialities function");
      console.log(JSON.stringify(data));
      this.filteredSpecialities = this.filterResult(query, data);
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
    let speciality2 = { name: '' };
    for (let i = 0; i < specialities.service.length; i++) {
      speciality = specialities.service[i];
      if (speciality.description.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        // speciality2.name = speciality.description;
        filtered.push(speciality);
      }
    }
    return filtered;
  }
  getAssets() {
    this.coreService.get('/weekday').subscribe((data) => {
      this.weekdays = data.weekday;
     // console.log(JSON.stringify(this.weekdays));
    }, (error) => {

    });
    this.coreService.get('/roles').subscribe((data) => {
      this.userRoleArray = data.roles;
    }, (error) => {

    });
  }
  getUserRole() {
    // console.log("called it");
    this.coreService.get('/roles').subscribe((data) => {
      this.userRoleArray = data.roles;
      for (let i = 0; i < this.userRoleArray.length; i++) {
        if (this.userRoleArray[i].id == this.userDetails.roles[0].id) {
          this.userRole = this.userRoleArray[i].name;
          break;
        }
      }
    }, (error) => {

    });
  }
  addRow() {
    this.groupedAvailabilities.push({ from_date: '', start_time: '', end_time: '', to_date: '', weekdays: [] });
    this.rowNumbersCount++;
  }
  deleteRow(j) {
    this.groupedAvailabilities.splice(j, 1);
    this.rowNumbersCount--;
  }

  backClicked() {
    this._location.back();
  }
  updateUser() {
    this.loading = true;
    delete this.updatedUserData.availability;
    delete this.updatedUserData.specialities;
    delete this.updatedUserData.service;
    this.updatedUserData.gender = this.updatedUserData.gender.name;
    this.updatedUserData.dob = this.coreService.convertDateToTimeFormat(this.updatedUserData.dob);
    //console.log("this.updatedUserData.schedules" + JSON.stringify(this.updatedUserData.schedules));
    // console.log("this.grouped availabilities" + JSON.stringify(this.groupedAvailabilities));
    var _availabilities = this.groupedAvailabilities;

    //availability update
    var _updateavailarr = [];

    for(var i = 0; i < _availabilities.length; i++){
      if(!_availabilities[i].id){
        _availabilities[i].from_date = this.coreService.convertDateToTimeFormat(_availabilities[i].from_date);
        _availabilities[i].to_date = this.coreService.convertDateToTimeFormat(_availabilities[i].to_date);
        _availabilities[i].start_time = this.coreService.convertDateToTimeFormat(_availabilities[i].start_time);
        _availabilities[i].end_time = this.coreService.convertDateToTimeFormat(_availabilities[i].end_time);
        _updateavailarr.push(_availabilities[i]);
      }
    }
    _availabilities = _updateavailarr;

    for(var i = 0; i < _availabilities.length; i++){
      var arr = [];
      for(var k = 0; k < _availabilities[i].weekdays.length; k++){
        arr.push( _availabilities[i].weekdays[k].id);
      }
      _availabilities[i].weekdays = JSON.stringify(arr);
    } 
    this.updatedUserData.schedules = _availabilities;


    //specialities update
    var _service =  this.specialities;
    var _arrservice = []
    for(var k = 0; k < _service.length; k++){
      var obj = {service_id: 0, user_id:0};
      obj.service_id = _service[k].id;
      obj.user_id = this.updatedUserData.id;
      _arrservice.push(obj);
    }
    this.updatedUserData.services = _arrservice;

 
    //console.log(JSON.stringify(this.updatedUserData));


    this.coreService.put('/updateUser/' + this.userId, this.updatedUserData).subscribe((data) => {
      console.log("done");
      this.getUser();
      this.loading = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User has succsessfully updated!' });
      //this.uploadImages(this.updatedUserData.user_id);
      //this.updateSpeciality();
    }, (error) => {
      console.log(error);
      this.messageService.add({ severity: 'error', summary: 'Failed!', detail: 'Unable to update user.! Server Error' });
    });
  }
  // updateSpeciality() {
  //   // console.log(this.specialities);
  //   this.coreService.post('/add_userspeciality/' + this.userId, this.specialities).subscribe((data) => {
  //     // console.log(data);
  //     this.updateAvailability();
  //   }, (error) => {
  //     this.messageService.add({ severity: 'error', summary: 'Failed!', detail: 'Oops!, something went wrong.' });
  //     this.loading = false;
  //   });
  // }
  // updateAvailability() {
  //   let _availabilities = Object.assign([], this.groupedAvailabilities);
  //   //  console.log(_availabilities)
  //   let _availabilities2 = [];
  //   for (let i = 0; i < _availabilities.length; i++) {
  //     for (let j = 0; j < _availabilities[i].weekdays.length; j++) {
  //       _availabilities2.push({ 'weekday': _availabilities[i].weekdays[j].id, 'from_date': this.coreService.convertDateToTimeFormat(_availabilities[i].fromDate), 'from_time': this.coreService.convertDateToTimeFormat(_availabilities[i].fromTime), 'to_date': this.coreService.convertDateToTimeFormat(_availabilities[i].toDate), 'to_time': this.coreService.convertDateToTimeFormat(_availabilities[i].toTime) });
  //     }
  //   }
  //   this.coreService.post('/adduser_availability/' + this.userId, _availabilities2).subscribe((data) => {
  //     //  console.log(data);
  //     this.getUser();
  //     this.loading = false;
  //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User has succsessfully updated!' });
  //   }, (error) => {
  //     // console.log(error);
  //     this.messageService.add({ severity: 'error', summary: 'Failed!', detail: 'Oops!, something went wrong.' });
  //     this.loading = false;
  //   });
  // }
  removeSpeciality(event) {
    console.log(event);
    console.log(JSON.stringify(this.specialitiesCopy));
    let flag = false;
    for (let i = 0; i < this.specialitiesCopy.length; i++) {
      if (event.service_id == this.specialitiesCopy[i].speciality.service_id) {
        flag = true;
        break;
      }
    }
    if (flag) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
          this.coreService.delete('/delete_userservice/' + this.userId + '/' + event.service_id, {}).subscribe((data) => {
            this.getUser();
          }, (error) => {
            this.specialities.push(event);
          });
        },
        reject: () => {
          this.specialities.push(event);
        },
      });
    }
  }

  sortAvailabilities() {
    let array4 = [];
    let obj: any = {};
    let j = 0;
    let _weekDays = [];
    let name;

    let _availabilities = this.availabilities
    for(var i = 0; i < _availabilities.length; i++){
      _availabilities[i].weekdays = JSON.parse(_availabilities[i].weekdays);
    }
    // console.log(">>>>><<<<<<<AVAVASFD" + JSON.stringify(_availabilities))
    for(var i = 0; i < _availabilities.length; i++){
      _availabilities[i].from_date = this.coreService.convertTimeToDateFormat(_availabilities[i].from_date);
      _availabilities[i].to_date = this.coreService.convertTimeToDateFormat(_availabilities[i].to_date);
      _availabilities[i].start_time = this.coreService.convertTimeToDateFormat(_availabilities[i].start_time);
      _availabilities[i].end_time = this.coreService.convertTimeToDateFormat(_availabilities[i].end_time);
    }
    
   
    this.coreService.get('/weekday').subscribe((data) => {
      this.weekdays = data.weekday;
      var weekdayArray = this.weekdays;
      //console.log("weekdayArray>>>> ", JSON.stringify(weekdayArray));
      for(var i = 0; i < _availabilities.length; i++){
        var arr = [];
        for(var k = 0; k < _availabilities[i].weekdays.length; k++){
          for(var n = 0; n < weekdayArray.length;n++){
            if(weekdayArray[n].id == _availabilities[i].weekdays[k]){
               var objk = {id: 0, name: ""};
               objk.id = weekdayArray[n].id;
               objk.name = weekdayArray[n].name;
              //  console.log(objk);
               arr.push(objk)
            }
          }
        }
        _availabilities[i].weekdays = Object.assign([], arr);
      } 
       this.groupedAvailabilities = Object.assign([], _availabilities);
       //console.log( this.groupedAvailabilities);
       this.existingAvailLength = Object.assign([], this.groupedAvailabilities);
       this.existingAvailLength = this.existingAvailLength.length;
       if ((this.existingAvailLength == 1) && (this.groupedAvailabilities[0].from_date == '' && this.groupedAvailabilities[0].to_date == '' && this.groupedAvailabilities[0].start_time == '' && this.groupedAvailabilities[0].end_time == '')) {
         console.log("this.existingAvailFlag"+ this.existingAvailFlag);
         this.existingAvailFlag = true;
       }   
       this.tooglee =  true;
    }, (error) => {

    });

  
    // console.log(JSON.stringify(this.groupedAvailabilities));
    // this.groupAvailabilities(this.availabilities);
    // for (let j = 0; j < this.sortedAvailabilites.length; j++) {
    //   for (let k = 0; k < this.sortedAvailabilites[j].length; k++) {
    //     let _temp = this.sortedAvailabilites[j];
    //     //  console.log(_temp[k]);
    //     for (let m = 0; m < this.weekDay.length; m++) {
    //       if (_temp[k].weekday == this.weekDay[m].id) {
    //         name = this.weekDay[m].name;
    //         break;
    //       }
    //     }
    //     _weekDays.push({ 'id': _temp[k].weekday, 'name': name });

    //     this.groupedAvailabilities[j] = { fromDate: this.coreService.convertTimeToDateFormat(_temp[k].fromDate), toDate: this.coreService.convertTimeToDateFormat(_temp[k].toDate), fromTime: this.coreService.convertTimeToDateFormat(_temp[k].fromTime), toTime: this.coreService.convertTimeToDateFormat(_temp[k].toTime), weekDays: [] };

    //   }

    //   this.groupedAvailabilities[j].weekDays = _weekDays;
    //   //console.log(this.groupedAvailabilities[j].weekDays)
    //   _weekDays = [];
    // }
   
    //  console.log(this.groupedAvailabilities);

  }

  groupAvailabilities(array) {
    // var array5 = [
    //   { id: 1, weekDay: 4, from_date: "1527143052", from_time: "1527143052", to_date: "1527143052", to_time: "1527143052" },
    //   { id: 2, weekDay: 5, from_date: "1527143052", from_time: "1527143052", to_date: "1527143052", to_time: "1527143050" },
    //   { id: 3, weekDay: 6, from_date: "1527143052", from_time: "1527143052", to_date: "1527143052", to_time: "1527143051" },
    //   { id: 4, weekDay: 2, from_date: "1527143052", from_time: "1527143052", to_date: "1527143052", to_time: "1527143051" },
    //   { id: 5, weekDay: 3, from_date: "1527143052", from_time: "1527143052", to_date: "1527143052", to_time: "1527143052" },
    //   { id: 6, weekDay: 7, from_date: "1527143052", from_time: "1527143052", to_date: "1527143052", to_time: "1527143052" },
    //   { id: 7, weekDay: 2, from_date: "1527143052", from_time: "1527143052", to_date: "1527143052", to_time: "1527143053" },
    //   { id: 8, weekDay: 5, from_date: "1527143052", from_time: "1527143052", to_date: "1527143052", to_time: "1527143053" }

    // ]
    var tempArray = Object.assign([], array);
    let array2 = [];
    let array3 = [];
    let subArray = [];
    var obj = {};
    var k = 0;
    var j = 0;
    compareValues(tempArray);
    function compareValues(tempArray) {
      if (k < tempArray.length) {
        let j = 0;
        var arrrr = [];
        let arrayUpdated = [];

        for (let i = 0; i < tempArray.length; i++) {
          if ((tempArray[j].from_date == tempArray[i].from_date) &&
            (tempArray[j].from_time == tempArray[i].from_time) &&
            (tempArray[j].to_date == tempArray[i].to_date) &&
            (tempArray[j].to_time == tempArray[i].to_time)) {

            arrrr.push(tempArray[i].id);
            var obj = { i: i, id: tempArray[i].id, fromDate: tempArray[i].from_date, fromTime: tempArray[i].from_time, toDate: tempArray[i].to_date, toTime: tempArray[i].to_time, weekday: tempArray[i].weekday };

            array2.push(obj);
          }

        }

        let tempArray2 = [];
        tempArray2 = Object.assign([], tempArray);

        for (var n = 0; n < arrrr.length; n++) {

          for (let m = 0; m < tempArray2.length; m++) {

            if (arrrr[n] == tempArray2[m].id) {

            } else {
              arrayUpdated.push(tempArray2[m]);
            }
          }

          tempArray2 = Object.assign([], arrayUpdated);

          arrayUpdated = [];
        }
        arrrr = [];
        array3.push(array2);
        array2 = [];
        tempArray = Object.assign([], tempArray2);
        compareValues(tempArray);
        k++;
      }
    }
    this.sortedAvailabilites = Object.assign([], array3);
  }

  openAddAppointmentModal(modalName, ) {
    this.alertService.openModal(modalName, this.userDetails);
  }

  uploadImages(user_id) {
    console.log('called');
    this.uploader.onBuildItemForm = function (fileItem, form) {
      form.append('user_id', user_id);
      return { fileItem, form }
    };
    this.uploader.uploadAll();
  }
}
