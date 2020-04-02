import { Component, OnInit, OnDestroy } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor() { }
  loginForm: any = undefined;
  ngOnInit() {
  }
  ngOnDestroy() {
  }
  modelLogin = {
    username: '',
    password: ''
  }

  showNotification(from, align, message) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: type[color],
      message: message

    }, {
      type: type[color],
      timer: 3000,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon"><img src="../assets/img/icons/common/github.svg"></i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

  login() {
    if (this.modelLogin.username === "") {
      this.showNotification('top','right', 'Tên người dùng không được để trống!')
      return;
    }
    if (this.modelLogin.password === "") {
      this.showNotification('top','right', 'Mật khẩu không được để trống!')
      return;
    }

    
    // this.alertService.clear();
    // if ($("idUsername") == null || $("idUsername").lg_username) {
    //   return;
    // }
    // $$$$_login : Uncomment below code
    // this.cookieService.set('access_token', "1111");
    // this.loginEvent.emit(<any>{
    //   username: 'James'
    // });
    // this.modal.modal("hide");

    // $$$$_login : comment below code
    // this.loading = true;
    // let autho = `Basic ${btoa(environment.jwt_username + ':' + environment.jwt_password)}`;
    // this.loginService.getToken({}, {
    //   'headers': {
    //     "Authorization": autho,
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   'params': {
    //     'grant_type': 'password',
    //     'scope': 'webclient customerfrontend',
    //     'username': this.model.lg_username, // fill real username here.
    //     'password': this.model.lg_password, // fill real passwore here.
    //     'captchaToken': this.recaptchaToken
    //   }
    // }).subscribe((response) => {
    //   let resp: I.ILoginResponse = <any>response;
    //   let currTime = new Date();
    //   let setTime = new Date(currTime.getTime() + resp.expires_in * 1000);
    //   this.cookieService.set('access_token', resp.access_token, undefined, "/");
    //   this.cookieService.set('refresh_token', resp.refresh_token), undefined, "/";
    //   this.cookieService.set('token_type', resp.refresh_token, undefined, "/");
    //   this.cookieService.set('expires_in', setTime.toString(), undefined, "/");
    //   this.cookieService.set('scope', resp.refresh_token, undefined, "/");
    //   this.cookieService.set('login_type', "OTHERS", undefined, "/");
    //   this.loginEvent.emit(resp);
    //   this.modal.modal("hide");
    //   this.dataShareService.setMessage("login");
    //   this.loginService.redirectToUrl();
    //   this.headerService.loadUserProfile();
    //   this.loading = false;
    //   this.model.lg_password = '';
    //   this.model.lg_username = '';
    // },
    //   (error: any) => {
    //     this.loading = false;
    //     if (error.error.error_description == "" || error.error.error_description == null) {
    //       this.alertService.error("Something went wrong ! please try again.", this.alertLoginId);
    //     } else {
    //       this.alertService.error(error.error.error_description, this.alertLoginId);
    //     }
    //     this.loadCaptchaToken();
    //   }
    // );
  }

}
