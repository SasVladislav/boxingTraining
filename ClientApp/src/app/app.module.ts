import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SportsmanComponent } from './components/sportsman/sportsman.component';
import { AuthenticationService } from './services/authentication.service';
import { RoundStatisticService } from './services/round-statistic.service';
import { SportsmanService } from './services/sportsman.service';
import { TrainerService } from './services/trainer.service';
import { UserDataStoreService } from './services/DataSeviceHelpers/data-store.service';
import { DataEventService } from './services/DataSeviceHelpers/data-event.service';
import { TrainingComponent } from './components/training/training.component';
import { TimerComponent } from './components/timer/timer.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { ChartsModule } from 'ng2-charts';
//import { MyDatePickerModule } from 'angular4-datepicker/src/my-date-picker/my-date-picker.module'
import { UtcDatepickerModule } from 'angular-utc-datepicker';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    SignInComponent,
    SignUpComponent,
    TrainingComponent,
    SportsmanComponent,
    TimerComponent,
    StatisticComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ChartsModule,
    //MyDatePickerModule,
    UtcDatepickerModule,
    RouterModule.forRoot([
      { path: '', component: SignInComponent, pathMatch: 'full' },
      { path: 'training', component: TrainingComponent },
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'sportsman', component: SportsmanComponent },
      { path: 'statistic', component: StatisticComponent },
    ])
  ],
  providers: [
    AuthenticationService,
    RoundStatisticService,
    SportsmanService,
    TrainerService,
    UserDataStoreService,
    DataEventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
