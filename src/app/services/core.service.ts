import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'url';
import { reject } from 'q';


@Injectable()
export class CoreService {

  public url = 'http://192.168.0.69:3000/';
  public sortedAvailabilites: any = [];
  public existingAvailLength: any = [];
  public groupedAvailabilities: any = [];
  public weekDay;
  public existingAvailFlag;
  public flag: boolean = false;

  constructor(private http: HttpClient) {

  }

  get(url) {
    return this.http.get<any>(url);
  }

  put(url, object) {
    return this.http.put(url, object);
  }

  post(url, object) {
    return this.http.post(url, object);
  }

  delete(url, object) {
    console.log(object)
    return this.http.delete(url, object);
  }

  convertDateToTimeFormat(date){
    let _date = new Date(date);
    let utcF = _date.toUTCString();
    let _utcF = new Date(utcF);
    let timeF = _utcF.getTime();
    return timeF;
  }

  convertTimeToDateFormat(time){
    let _d1 = JSON.parse(time);
    let d1 = new Date(_d1);
    return d1;
  }

  getAssets():any {
    this.get('/weekday').subscribe((data) => {
      this.weekDay = data.weekday;
      console.log(JSON.stringify(this.weekDay));
      return this.weekDay;
    }, (error) => {

    });
  }

  sortAvailabilities(availabilities):any{
    return new Promise((resolve, reject) => {
      var _updateavailarr = [];
      var _availabilities = availabilities;
    for(var i = 0; i < _availabilities.length; i++){
        _availabilities[i].from_date = this.convertDateToTimeFormat(_availabilities[i].from_date);
        _availabilities[i].to_date = this.convertDateToTimeFormat(_availabilities[i].to_date);
        _availabilities[i].start_time = this.convertDateToTimeFormat(_availabilities[i].start_time);
        _availabilities[i].end_time = this.convertDateToTimeFormat(_availabilities[i].end_time);
        _updateavailarr.push(_availabilities[i]);
    }
    _availabilities = _updateavailarr;

    for(var i = 0; i < _availabilities.length; i++){
      var arr = [];
      for(var k = 0; k < _availabilities[i].weekdays.length; k++){
        arr.push( _availabilities[i].weekdays[k].id);
      }
      _availabilities[i].weekdays = JSON.stringify(arr);
    }
    //console.log("_availabilities>>>>>>> " + JSON.stringify(_availabilities)); 
    resolve(_availabilities);
    }).catch(err=>{
        reject(err);
    });
  }
}
