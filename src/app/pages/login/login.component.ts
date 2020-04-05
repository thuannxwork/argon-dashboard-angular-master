import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Http } from '@angular/http';
// import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { NotificationComponent } from '../../notification/notification.component'

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [NotificationComponent]
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private cookieService: CookieService,
    private http: Http,
    private router: Router,
    private notificationComponent: NotificationComponent
  ) { }
  loginForm: any = undefined;
  ngOnInit() {
  }
  ngOnDestroy() {
  }
  modelLogin = {
    username: '',
    password: ''
  }


  getToken(body: any, options: any) {
    return this.http.post('http://localhost:6789/api/sso/auth/login', body, options);
  }

  login() {
    if (this.modelLogin.username === "") {
      this.notificationComponent.showNotification('top', 'right', 'Tên người dùng không được để trống!')
      return;
    }
    if (this.modelLogin.password === "") {
      this.notificationComponent.showNotification('top', 'right', 'Mật khẩu không được để trống!')
      return;
    }

    this.getToken(
      {
        "username": this.modelLogin.username,
        "password": btoa(this.modelLogin.password)//encode base64
        //(atob("encodeValue")); --> Decode base64
      },
      {
        'headers': {
          "content-type": ["application/json; charset=utf-8"]
        }
      }
    ).toPromise()
      .then(res => res.json())
      .then(resJson => {
        if (resJson.responseCode === '000') {
          this.cookieService.set('access_token', resJson.responseData.accessToken, undefined, "/");
          this.notificationComponent.showNotification('top', 'right', 'Đăng nhập thành công')
          this.router.navigate(['dashboard']);
        } else {
          this.notificationComponent.showNotification('top', 'right', 'Tên đăng nhập hoặc mật khẩu không đúng')
        }
      })
      .catch(err => {
        this.notificationComponent.showNotification('top', 'right', 'Đăng nhập không thành công.' + err)
      });


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
