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
          console.log(this.cookieService.get('access_token'));
          this.notificationComponent.showNotification('top', 'right', 'Đăng nhập thành công')
          this.router.navigate(['dashboard']);
        } else {
          this.notificationComponent.showNotification('top', 'right', 'Tên đăng nhập hoặc mật khẩu không đúng')
        }
      })
      .catch(err => {
        this.notificationComponent.showNotification('top', 'right', 'Đăng nhập không thành công.' + err)
      });
  }

}
