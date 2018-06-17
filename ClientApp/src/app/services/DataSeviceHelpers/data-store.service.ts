import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SportUser } from '../../models/entity/sport-user';
import { TrainerService } from './../trainer.service';


@Injectable()
export class UserDataStoreService {

  private userObjectSource = new BehaviorSubject<SportUser>(null);
  currentUser = this.userObjectSource.asObservable();

  constructor(private trainerService: TrainerService) {
    var trainerGuid = localStorage.getItem('trainerGuid');
    if (trainerGuid != null ) {
      this.trainerService.getTrainer(trainerGuid).subscribe(user => {
        if (user != null) {
          this.setUser(user);
        }
      })
    }
  }

  setUser(person: SportUser) {
    this.userObjectSource.next(person);
  }
}
