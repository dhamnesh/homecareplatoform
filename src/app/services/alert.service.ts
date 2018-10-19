import { Injectable } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Subject } from "rxjs/Subject";

@Injectable()
export class AlertService {
    private subject = new Subject<any>();
    private openModalFlag = new Subject<any>();
    private asset = new Subject<any>();
    private refresh = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(private _router: Router) {
        // clear alert message on route change
        _router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    }

    error(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'danger', text: message });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    openModal(modalName:string, asset:any, keepAfterNavigationChange = false){
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        console.log(modalName);
        this.openModalFlag.next(modalName);
        this.asset.next(asset);
    }
    toggleModal(keepAfterNavigationChange = false){
        return this.openModalFlag.asObservable();  
    }
    getAsset(keepAfterNavigationChange = false){
        return this.asset.asObservable();  
    }
    refreshContents(keepAfterNavigationChange = false){
        this.refresh.next(true);
    }
    observeRefreshInit(keepAfterNavigationChange = false){
        return this.refresh.asObservable();  
    }
   
}
