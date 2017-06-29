import { Injectable } from '@angular/core';
import { Http, Headers, Response , RequestOptions } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map'
import { User } from '../_models/user';
import { AuthUser } from '../_models/authUser';

@Injectable()
export class AuthenticationService {
    public user: User = new User();
    public token: string;
    public siteUrl: string = 'http://smktesting.herokuapp.com';
    public registerUrl: string = this.siteUrl + '/api/register/';
    public loginUrl: string = this.siteUrl + '/api/login/';

    // add authorization header with jwt token
    public headers = new Headers({ 'Content-Type': 'application/json' });
    public options = new RequestOptions({ headers: this.headers });
    public $eventSubject = new BehaviorSubject(null);

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(data: AuthUser): Observable<boolean> {
        return this.http.post(this.loginUrl, JSON.stringify(data),this.options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;

                if (token) {
                    // set token property
                    this.token = token;

                    let user = new User();
                    user.token = token;
                    user.username = data.username;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    console.log(localStorage);
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    register(data: AuthUser): Observable<boolean> {
      return this.http.post(this.registerUrl, JSON.stringify(data),this.options)
        .map((response: Response) => {
          // login successful if there's a jwt token in the response
          let token = response.json() && response.json().token;

          if (token) {
            // set token property
            this.token = token;

            let user = new User();
            user.token = token;
            user.username = data.username;

            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));

            // return true to indicate successful login
            return true;
          } else {
            // return false to indicate failed login
            return false;
          }
        });
    }

    getAuthUser(): User {
      if (!this.user.username && localStorage.getItem('currentUser')) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.user = new User(currentUser['id'],currentUser['email'],currentUser['first_name'],currentUser['last_name'],currentUser['username']);
      }
      return this.user;
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.user = new User();
        localStorage.removeItem('currentUser');
    }
}
