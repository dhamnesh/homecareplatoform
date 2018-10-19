import { Component, OnInit, ViewEncapsulation, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../../services/core.service';
import { AuthService } from '../../components/guard';
import { ScriptLoaderService } from '../../services/script-loader.service';
import { AlertService } from '../../services/alert.service';
import { Helpers } from '../../helpers';
import { AlertComponent } from '../../directives/alert.component';
declare let $: any;
declare let mUtil: any;

@Component({
  selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

  user = { userName: '', password: '' };
  submitted = false;
  model: any = {};
  loading = false;

  @ViewChild('alertSignin',
    { read: ViewContainerRef }) alertSignin: ViewContainerRef;
  @ViewChild('alertForgotPass',
    { read: ViewContainerRef }) alertForgotPass: ViewContainerRef;

  constructor(
    public router: Router,
    public coreService: CoreService,
    private _script: ScriptLoaderService,
    private _alertService: AlertService,
    public authService: AuthService,
    private cfr: ComponentFactoryResolver) {

  }

  ngOnInit() {
    this._script.loadScripts('body', [
      'assets/vendors/base/vendors.bundle.js',
      'assets/demo/default/base/scripts.bundle.js'], true).then(() => {
        Helpers.setLoading(false);
        this.handleSignInFormSubmit();
        this.handleFormSwitch();
      });

  }

  login() {
    this.loading = true;
    //this.router.navigate(['/dashboard']);
    this.coreService.post('/login', this.model).subscribe((data) => {
      this.authService.setUser(data);
      this.authService.save();
      this.router.navigate(['/dashboard']);
    }, (error) => {
      this.showAlert('alertSignin');
      this._alertService.error(error.error.error);
      this.loading = false;
    });
  }

  forgotPass() {
    this.loading = true;
    // this._userService.forgotPassword(this.model.email).subscribe(
    //     data => {
    //         this.showAlert('alertSignin');
    //         this._alertService.success(
    //             'Cool! Password recovery instruction has been sent to your email.',
    //             true);
    //         this.loading = false;
    //         this.displaySignInForm();
    //         this.model = {};
    //     },
    //     error => {
    //         this.showAlert('alertForgotPass');
    //         this._alertService.error(error);
    //         this.loading = false;
    //     });
  }
  showAlert(target) {
    this[target].clear();
    let factory = this.cfr.resolveComponentFactory(AlertComponent);
    let ref = this[target].createComponent(factory);
    ref.changeDetectorRef.detectChanges();
  }

  handleSignInFormSubmit() {
    $('#m_login_signin_submit').click((e) => {
      let form = $(e.target).closest('form');
      form.validate({
        rules: {
          email: {
            required: true,
            email: true,
          },
          password: {
            required: true,
          },
        },
      });
      if (!form.valid()) {
        e.preventDefault();
        return;
      }
    });
  }

  displaySignInForm() {
    let login = document.getElementById('m_login');
    mUtil.removeClass(login, 'm-login--forget-password');
    mUtil.removeClass(login, 'm-login--signup');
    try {
      $('form').data('validator').resetForm();
    } catch (e) {
    }

    mUtil.addClass(login, 'm-login--signin');
    mUtil.animateClass(login.getElementsByClassName('m-login__signin')[0], 'flipInX animated');
  }
  displayForgetPasswordForm() {
    let login = document.getElementById('m_login');
    mUtil.removeClass(login, 'm-login--signin');
    mUtil.removeClass(login, 'm-login--signup');

    mUtil.addClass(login, 'm-login--forget-password');
    mUtil.animateClass(login.getElementsByClassName('m-login__forget-password')[0], 'flipInX animated');
  }

  handleFormSwitch() {
    document.getElementById('m_login_forget_password').addEventListener('click', (e) => {
      e.preventDefault();
      this.displayForgetPasswordForm();
    });

    document.getElementById('m_login_forget_password_cancel').addEventListener('click', (e) => {
      e.preventDefault();
      this.displaySignInForm();
    });

    // document.getElementById('m_login_signup').addEventListener('click', (e) => {
    //     e.preventDefault();
    //     this.displaySignUpForm();
    // });

    document.getElementById('m_login_signup_cancel').addEventListener('click', (e) => {
      e.preventDefault();
      this.displaySignInForm();
    });
  }


}
