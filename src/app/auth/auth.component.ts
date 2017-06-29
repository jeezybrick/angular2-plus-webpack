import {
  Component,
  OnInit,
  ViewContainerRef
} from '@angular/core';

import { Router } from '@angular/router';
import { Title } from './title';
import { AuthenticationService } from '../_services/index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { User } from '../_models/user';
import { RegisterUser } from '../_models/registerUser';
import { AuthUser } from '../_models/authUser';

@Component({
  selector: 'auth',
  providers: [],
  styleUrls: ['./auth.component.scss'],
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  public loading: boolean = false;
  public error: string = 'Username or password is incorrect';
  public authUser: User = new User();
  public loginUser: AuthUser = new AuthUser();
  public registerUser: AuthUser = new AuthUser();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  public ngOnInit() {
    this.authUser = this.authenticationService.getAuthUser();

    console.log(this.authUser);

    if(this.authUser.username){
      this.router.navigate(['/product']);
    }
  }

  signUp(){

    this.loading = true;

    this.authenticationService.register(this.registerUser)
      .finally(() => this.loading = false)
      .subscribe(result => {
        if (result === true) {
          this.authenticationService.$eventSubject.next({'qweqw': 'asdasd'});
          this.router.navigate(['/product']);
        } else {
          this.toastr.error('User with such username already exists');
        }
      });

  }

  signIn(){

    this.loading = true;
    this.authenticationService.login(this.loginUser)
      .finally(() => this.loading = false)
      .subscribe(result => {
        if (result === true) {
          this.authenticationService.$eventSubject.next({'qweqw': 'asdasd'});
          this.router.navigate(['/product']);
        } else {
          this.toastr.error('Username or password is incorrect');
        }
      });

  }

}
