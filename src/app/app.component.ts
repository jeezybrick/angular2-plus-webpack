/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
import { Router } from '@angular/router';
import { SharedService } from './shared/shared.service';
import { AuthenticationService } from './_services/index';
import { User } from './_models/user';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  templateUrl:'./app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  public preloaderColor:string = 'praimry';
  public preloaderMode:string = 'indeterminate';
  public preloaderValue:number = 50;

  public authUser: User;
  public sub: any;

  constructor(
    public appState: AppState,
    private authenticationService: AuthenticationService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  public ngOnInit() {

    this.sub = this.authenticationService.$eventSubject.subscribe((data) => {
      console.log('$eventSubject', data);
      this.authUser = this.authenticationService.getAuthUser();
    });
  }

  public ngOnDestroy():void {
    console.log('APP DESTROY');
    this.sub.unsubscribe();
  }

  public logout():void {
    this.authenticationService.logout();
    this.authUser = this.authenticationService.getAuthUser();
    this.router.navigate(['/']);
  }

}
