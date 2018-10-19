import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../services/core.service';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html'
})
export class AppointmentsComponent implements OnInit {

  events: any[];
  clientAppointments: any;
  headerConfig: any;
  eventColor: any;

  constructor(private coreService: CoreService) { }

  ngOnInit() {
    this.events = [
      {
          "title": "All Day Event",
          "start": "2018-07-01"
      },
      {
          "title": "Long Event",
          "start": "2018-06-07",
          "className": "event-not-available"
      },
      {
          "title": "Repeating Event",
          "start": "2016-01-09T16:00:00"
      },
      {
          "title": "Repeating Event",
          "start": "2016-01-16T16:00:00"
      },
      {
          "title": "Conference",
          "start": "2016-01-11",
          "end": "2016-01-13"
      },
      {
          "title": "Event1",
          "start": "2018-06-21",
          "className": "event-default"
      },
      {
          "title": "Event2",
          "start": "2018-06-21",
          "textColor": "#ffffff",
          "className": "event-success"
      },
      {
          "title": "Event2",
          "start": "2018-06-21",
          "textColor": "#ffffff",
          "className": "event-success"
      },
      {
          "title": "Event2",
          "start": "2018-06-21",
          "textColor": "#ffffff",
          "className": "event-success"
      },
      {
          "title": "Event2",
          "start": "2018-06-21",
          "textColor": "#ffffff",
          "className": "event-success"
      },
      {
          "title": "Event2",
          "start": "2018-06-21",
          "textColor": "#ffffff",
          "className": "event-success"
      },
      {
          "title": "Event2",
          "start": "2018-06-21",
          "textColor": "#ffffff",
          "className": "event-success"
      }
    ];


    this.headerConfig = {
			left: '',
			center: '',
			right: 'title agendaDay,agendaWeek,month today,prev,next,'
		};

    this.getAllServiceReceiverAppointment();
  }

  getAllServiceReceiverAppointment(){
    this.coreService.get('/getAllServiceReceiverAppointment').subscribe((result) => {
        console.log("got the result");
        this.clientAppointments = result;
        console.log("this.clientAppointments" + JSON.stringify(this.clientAppointments));
    }, (error) => {
        console.log(error);
    });

  }

}
