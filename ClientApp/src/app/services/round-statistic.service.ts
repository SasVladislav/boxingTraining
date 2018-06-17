import { Injectable, Inject, Injector } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SignIn } from '../models/view/sign-in';
import { TrainerView } from '../models/view/trainer-view';
import { HttpClient } from '@angular/common/http';
import { FilterRoundsStatistic } from '../models/view/filter-round-statistic';
import { RoundStatistic } from '../models/entity/round-statistic';


@Injectable()
export class RoundStatisticService {

    private baseUrl: string;

    constructor(
        private http: HttpClient,
        private injector: Injector
    ) {
        this.baseUrl = "http://localhost:62255/api";
    }

  PostFilterRoundsStatistic(filterRoundsStatistic: FilterRoundsStatistic): Observable<RoundStatistic[]> {
    return this.http.post<RoundStatistic[]>(`${this.baseUrl}/RoundStatistic/PostFilterRoundsStatisticAsync`, filterRoundsStatistic)
  };
  Get() {
    return this.http.get(`${this.baseUrl}/RoundStatistic`)
  };
  Post(roundStatistic: RoundStatistic) {
    return this.http.post(`${this.baseUrl}/RoundStatistic/Post`, roundStatistic)
  };
  Put(roundStatistic: RoundStatistic) {
    return this.http.put(`${this.baseUrl}/RoundStatistic`, roundStatistic)
  };
  Delete(guid: string) {
    return this.http.delete(`${this.baseUrl}/RoundStatistic/${guid}`)
  };
}
