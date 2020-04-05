import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { NotificationComponent } from '../../notification/notification.component'

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private http: Http,
    private notificationComponent: NotificationComponent
  ) {}

  ngOnInit() {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json; charset=utf-8');
    // console.log(this.cookieService.get('access_token'));
    // headers.append('Authorization', 'Bearer ' + this.cookieService.get('access_token'));
    // let options = new RequestOptions({ headers: headers });
    this.http.get("http://localhost:6789/api/category/param/findAll/", this.getTokenHeader()).toPromise()
      .then(res => res.json())
      .then(resJson => {
        if (resJson.responseCode === '000') {
          this.notificationComponent.showNotification('top', 'right', resJson.responseCode)
        } else {
          this.notificationComponent.showNotification('top', 'right', resJson.responseCode)
        }
      })
      .catch(err => {
        this.notificationComponent.showNotification('top', 'right', 'Có lỗi khi lấy dữ liệu từ server.' + err)
      });
  }

  getTokenHeader() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    console.log(this.cookieService.get('access_token'));
    headers.append('Authorization', 'Bearer ' + this.cookieService.get('access_token'));
    let options = new RequestOptions({ headers: headers });
    return options;
  }

}
