import { Injectable, Inject, Injector } from '@angular/core';
//import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SignIn } from '../models/view/sign-in';
import { TrainerView } from '../models/view/trainer-view';
import { SportUser } from '../models/entity/sport-user';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthenticationService {

    private baseUrl: string;

    constructor(
        private http: HttpClient,
        private injector: Injector
    ) {
        this.baseUrl = "http://localhost:62255/api";
    }

    SignIn(signInModel: SignIn): Observable<string> {
        return this.http.post<string>(`${this.baseUrl}/Authentication/SignIn`, signInModel)
    };
    SignUp(trainerView: TrainerView): Observable<string> {
        return this.http.post<string>(`${this.baseUrl}/Authentication/SignUp`, trainerView)
    };
}
