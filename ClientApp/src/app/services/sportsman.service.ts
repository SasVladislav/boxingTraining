import { Injectable, Inject, Injector } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SignIn } from '../models/view/sign-in';
import { TrainerView } from '../models/view/trainer-view';
import { HttpClient } from '@angular/common/http';
import { CreateSportsman } from '../models/view/create-sportsman';
import { SportUser } from '../models/entity/sport-user';


@Injectable()
export class SportsmanService {

    private baseUrl: string;

    constructor(
        private http: HttpClient,
        private injector: Injector
    ) {
        this.baseUrl = "http://localhost:62255/api";
    }

  Get(): Observable<SportUser[]> {
    return this.http.get<SportUser[]>(`${this.baseUrl}/Sportsman`)
    };
  Post(createSportsman: CreateSportsman) {
        return this.http.post(`${this.baseUrl}/Sportsman`, createSportsman)
  };
  Put(sportsman: SportUser) {
    return this.http.put(`${this.baseUrl}/Sportsman`, sportsman)
  };
  Delete(guid:string) {
    return this.http.delete(`${this.baseUrl}/Sportsman?Id=${guid}`)
  };
}
