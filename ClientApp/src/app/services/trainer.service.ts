import { Injectable, Inject, Injector } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SignIn } from '../models/view/sign-in';
import { TrainerView } from '../models/view/trainer-view';
import { HttpClient } from '@angular/common/http';
import { SportUser } from '../models/entity/sport-user';


@Injectable()
export class TrainerService {

  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private injector: Injector
  ) {
    this.baseUrl = "http://localhost:62255/api";
  }

  getTrainer(trainerGuid: string): Observable<SportUser> {
    return this.http.get<SportUser>(`${this.baseUrl}/Trainer/Get/${trainerGuid}`)
  };
  getTrainerSportsmans(trainerGuid: string): Observable<SportUser[]> {
    return this.http.get<SportUser[]>(`${this.baseUrl}/Trainer/GetTrainerSportsmans/${trainerGuid}`)
  };
  Get() {
    return this.http.get(`${this.baseUrl}/Trainer`)
  };
  Post(sportUser: SportUser) {
    return this.http.post(`${this.baseUrl}/Trainer`, sportUser)
  };
  Put(sportUser: SportUser) {
    return this.http.put(`${this.baseUrl}/Trainer`, sportUser)
  };
  Delete(guid: string) {
    return this.http.delete(`${this.baseUrl}/RoundStatistic/${guid}`)
  };
}
