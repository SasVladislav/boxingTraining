import { Component } from '@angular/core';
import { SignIn } from '../../models/view/sign-in';
import { AuthenticationService } from '../../services/authentication.service';
import { SportUser } from '../../models/entity/sport-user';
import { debug } from 'util';
import { DataEventService } from '../../services/DataSeviceHelpers/data-event.service';
import { Router } from '@angular/router';
import { UserDataStoreService } from '../../services/DataSeviceHelpers/data-store.service';

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html'
})
export class SignInComponent {
    public signInModel: SignIn;
  constructor(private userDataStoreService: UserDataStoreService,public router: Router,private authenticationService: AuthenticationService, private dataEventService: DataEventService) {
        this.signInModel = new SignIn();
    }
  SignIn() {
    this.authenticationService.SignIn(this.signInModel).subscribe(response => {
          localStorage.setItem('trainerGuid', response);
          this.dataEventService.toggle();
          this.router.navigate(['sportsman']);
        });
    }
}
