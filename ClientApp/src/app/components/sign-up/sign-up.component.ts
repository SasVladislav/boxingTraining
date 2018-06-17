import { Component } from '@angular/core';
import { TrainerView } from '../../models/view/trainer-view';
import { AuthenticationService } from '../../services/authentication.service';
import { DataEventService } from '../../services/DataSeviceHelpers/data-event.service';
import { Router } from '@angular/router';
import { UserDataStoreService } from '../../services/DataSeviceHelpers/data-store.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {
  public signUpModel: TrainerView;
  constructor(private userDataStoreService: UserDataStoreService, public router: Router, private authenticationService: AuthenticationService, private dataEventService: DataEventService) {
    this.signUpModel = new TrainerView();
  }
  SignUp() {
    this.authenticationService.SignUp(this.signUpModel).subscribe(response => {
      localStorage.setItem('trainerGuid', response);
          this.dataEventService.toggle();
          this.router.navigate(['sportsman']);
    });
  }
}
