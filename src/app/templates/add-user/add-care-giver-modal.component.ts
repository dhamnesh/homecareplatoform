import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AlertService } from "../../services/index";
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CoreService } from '../../services/core.service';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
// import { FileUploader } from 'ng2-file-upload';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

declare let $: any;

@Component({
    selector: 'app-add-care-modal',
    templateUrl: './add-care-giver-modal.component.html',
    encapsulation: ViewEncapsulation.None
})

export class AddCareGiverComponent implements OnInit {

    public message: any;
    public roleId: number;
    public display: boolean = false;
    public activeId: string = 'basic-details';
    public availabilities: any = [{ fromDate: '', fromTime: '', toTime: '', toDate: '', weekdays: [] }];
    public careGiverData: any = {};
    public filteredSpecialities: any[];
    public rowNumbers: any = [1];
    public rowNumbersCount = 1;
    public genderArray: any = [{ name: 'Male' }, { name: 'Female' }];
    public weekDay: any;
    public files: any;
    public modalName: string;
    public RoleName: string;
    loading: boolean = false;
    placeholder: string = '';
    public show:boolean = false;

    // public uploader: FileUploader = new FileUploader({ url: URL });
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
    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;

    constructor(private _alertService: AlertService, public coreService: CoreService, private messageService: MessageService) {
        this.weekDay = [];
        // this.uploader.onWhenAddingFileFailed = (item, filter, options) => this.onUploadImageFailed(item, filter, options);
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
    }

    ngOnInit() {
        this._alertService.toggleModal().subscribe(modalName => {

            if (modalName == 'caregiver') {
                this.RoleName = 'Caregiver';
                this.modalName = 'Add Care Giver';
                this.placeholder = 'Speciality';
                this.display = true;
                this.customOnInit();
            }
            if (modalName == 'client') {
                this.modalName = 'Add Client';
                this.placeholder = 'Care plan';
                this.RoleName = 'Patient';
                this.display = true;
                this.customOnInit();
            }

        });
    }

    customOnInit() {
        let self = this;
        $(".tab-pane.active").each(function () {
            self.activeId = $(this).attr('id');
            console.log(this.activeId)
        });
        this.getAssets();
        this.validateButton();
    }
    next() {
        if (($('.tab-pane.active .form-control.ng-invalid:first').length > 0) || ((!this.careGiverData.dob) || (!this.careGiverData.gender))) {
            $('#next-btn').addClass('disabled-button');
        }
        else {
            let self = this;
            $('#next-btn').removeClass('disabled-button');
            $('.tab-pane.active').removeClass('active').next('.tab-pane').addClass('active');
            $('.tab-pane.active').each(function () {
                let id = $(this).attr('id');
                self.activeId = id;
            });
        }
    }
    back() {
        let self = this;
        $('.tab-pane.active').removeClass('active').prev('.tab-pane').addClass('active');
        $(".tab-pane.active").each(function () {
            let id = $(this).attr('id');
            self.activeId = id;
        });
    }
    validateButton() {
        if ($('.tab-pane.active .form-control.ng-invalid:first').length < 1 ) {
            $('#next-btn').removeClass('disabled-button');
        }
        $(".form-control").change(function () {
            if ($('.tab-pane.active .form-control.ng-invalid:first').length < 1 ) {
                $('#next-btn').removeClass('disabled-button');
            }
        });
    }

    filterSpeciality(event) {
        let query = event.query;
        this.getSpecialities(query);
    }

    filterResult(query, specialities): any[] {
        console.log(specialities);
        let filtered: any[] = [];
        let speciality;
        let speciality2 = { name: '', service_id: 0 };
        for (let i = 0; i < specialities.service.length; i++) {
            speciality = specialities.service[i];
            if (speciality.description.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                speciality2.name = speciality.description;
                speciality2.service_id = speciality.id;
                filtered.push(speciality2);
            }
        }
        console.log(filtered);
        return filtered;
    }
    addRow() {
        this.availabilities.push({ fromDate: '', fromTime: '', toTime: '', toDate: '' });
        this.rowNumbersCount++;
    }
    deleteRow() {
        this.availabilities.pop({ fromDate: '', fromTime: '', toTime: '', toDate: '' });
        this.rowNumbersCount--;
    }

    getSpecialities(query) {
        this.coreService.get('/services').subscribe((data) => {
            this.filteredSpecialities = this.filterResult(query, data);
        }, (error) => {

        });
    }
    addCareGiver() {
        console.log('called');
        this.loading = true;
        let _availabilities = Object.assign([], this.availabilities);
        console.log("this.availabilities>>>>" + JSON.stringify(this.availabilities));
        let _availabilities2 = [];
        for (let i = 0; i < _availabilities.length; i++) {
            _availabilities2.push({ 'weekdays': [], 'from_date': this.coreService.convertDateToTimeFormat(_availabilities[i].fromDate), 'start_time': this.coreService.convertDateToTimeFormat(_availabilities[i].fromTime), 'to_date': this.coreService.convertDateToTimeFormat(_availabilities[i].toDate), 'end_time': this.coreService.convertDateToTimeFormat(_availabilities[i].toTime) });
        }

        for(var i = 0; i < _availabilities.length; i++){
            var arr = [];
            for(var k = 0; k < _availabilities[i].weekdays.length; k++){
              arr.push(_availabilities[i].weekdays[k].id);
            }
            _availabilities2[i].weekdays = Object.assign([], arr);
            _availabilities2[i].weekdays = JSON.stringify(_availabilities2[i].weekdays);
          }
          
         let _specialites = [];
         for(let n = 0; n < this.careGiverData.service.length;n++){
            _specialites.push(this.careGiverData.service[n].service_id);
         }
         console.log("_specialites>>>>>>" + JSON.stringify(_specialites));
          console.log("_availabilities2>>>>" + JSON.stringify(_availabilities2));


        this.careGiverData.availabilities = _availabilities2;
        this.careGiverData.specialities = _specialites;
        this.careGiverData.gender = this.careGiverData.gender.name;
        this.careGiverData.dob = this.coreService.convertDateToTimeFormat(this.careGiverData.dob);
        this.careGiverData.role_id = this.roleId;
        this.careGiverData.image = this.files;

        if(!this.careGiverData.address2){
            this.careGiverData.address2 = "";
        }
        if(!this.careGiverData.middle_name){
            this.careGiverData.middle_name = "";
        }

        console.log("this.careGiverData" + JSON.stringify(this.careGiverData));
        this.coreService.post('/add_user', this.careGiverData).subscribe((res) => {
            let _res = JSON.stringify(res);
            let _res1 = JSON.parse(_res);
            console.log(_res1.user_id);
            //this.uploadImages(_res1.user_id);
            this.loading = false;
            this.display = false;
            this._alertService.refreshContents();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User has succsessfully added!' });
            this.careGiverData = {};
           $('#add_user')[0].reset();
        }, (error) => {
            this.loading = false;
            this.messageService.add({ severity: 'error', summary: 'Failed!', detail: 'Failed.!, Unable to add user' });
        });
        console.log(JSON.stringify(this.careGiverData));
    }


    getAssets() {
        this.coreService.get('/weekday').subscribe((data) => {
            this.weekDay = data.weekday;
        }, (error) => {

        });

        this.coreService.get('/roles').subscribe((data) => {
            console.log(data)
            if (this.RoleName == "Patient") {
                for (let i = 0; i < data.roles.length; i++) {
                    if (data.roles[i].name == 'Patient') {
                        this.roleId = data.roles[i].id;
                        break;
                    }
                }
            }
            if (this.RoleName == "Caregiver") {
                for (let i = 0; i < data.roles.length; i++) {
                    if (data.roles[i].name == 'Caregiver') {
                        this.roleId = data.roles[i].id;
                        break;
                    }
                }
            }
        }, (error) => {

        });
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }

    uploadImages(user_id) {
        this.uploader.onBuildItemForm = function (fileItem, form) {
            form.append('user_id', user_id);
            return { fileItem, form }
        };
        this.uploader.uploadAll();
    }


}
