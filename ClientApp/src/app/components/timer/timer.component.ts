import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/interval';
import { Subscription } from "rxjs/Subscription";
import { SportUser } from "../../models/entity/sport-user";
import { SportsmanService } from "../../services/sportsman.service";
import { RoundStatisticService } from "../../services/round-statistic.service";
import { RoundStatistic } from "../../models/entity/round-statistic";
import * as Tone from 'tone';
import { TrainerService } from "../../services/trainer.service";

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html'
})
export class TimerComponent implements OnInit {

  timerMinutes: number = 0;
  timerSeconds: number = 0;
  timerRound: number = 0;
  isRelax: boolean = false;
  isStartTimer: boolean = false;
  subscription: Subscription;
  synth: any;

  selectedSportsmanId: string;
  selectedRound: number = 0;
  selectedTone: string = "";
  timerRoundDurationMinutes: number;
  timerRoundDurationSeconds: number;
  timerRelaxDurationMinutes: number;
  timerRelaxDurationSeconds: number;

  allSportsmans: SportUser[] = [];
  rounds: number[] = [];
  secondsArray: number[] = [];
  minutesRoundArray: number[] = [];
  minutesReluxArray: number[] = [];
  tonesList: string[] = ["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4", "I4", "G4"];

  trainerGuid = "";
  isDisableControls: boolean = true;

  constructor(private trainerService: TrainerService,private sportsmanService: SportsmanService, private roundStatisticService: RoundStatisticService) {
  }

  ngOnInit(): void {
    this.synth = new Tone.Synth().toMaster();
    this.trainerGuid = localStorage.getItem('trainerGuid');
    this.getAllSportsmans();
    this.fillRoundsDropdown();
    this.fillTimesArraysDropdown();   
    this.selectedTone = this.tonesList[0];
  }

  start() {
    this.playTone(this.selectedTone);
    this.isStartTimer = true;
    let timerInterval: number = 1000;
    this.subscription = Observable.interval(timerInterval)
      .subscribe((val) => { this.timeIt() });
  }

  stop() {
    this.isStartTimer = false;
    if (this.selectedRound != 0) {
      let userRounds = this.fillUserRoundModel();
      this.roundStatisticService.Post(userRounds).subscribe(response => {
        this.restartAll();
      });
    }
    this.subscription.unsubscribe();
  }

  fillUserRoundModel() {
    let userRounds = new RoundStatistic();
    userRounds.SportUserId = this.selectedSportsmanId != null ? this.selectedSportsmanId : this.trainerGuid;
    userRounds.DateRecord = new Date().toLocaleDateString();
    userRounds.CountRounds = this.timerRound;
    return userRounds;
  }

  restartTimerTime() {
    this.timerMinutes = this.timerRoundDurationMinutes;
    this.timerSeconds = this.timerRoundDurationSeconds;
  }

  timeIt() {

    this.ifEndTimerTimes();

    this.ifEndSecondsCount();

    this.playSignalTimerSeconds();
    
    this.timerSeconds--;
  }

  ifEndTimerTimes() {
    if (this.timerMinutes == 0 && this.timerSeconds == 0) {
      if (this.isRelax) {
        this.playTone(this.selectedTone);
        this.restartTimerTime();
        this.isRelax = false;
        return;
      }
      if (!this.isRelax) {
        this.timerRound++;
        if (this.timerRound == this.selectedRound) {
          this.stop();
          return;
        }
        this.timerMinutes = this.timerRelaxDurationMinutes;
        this.timerSeconds = this.timerRelaxDurationSeconds;
        this.isRelax = true;
        return;
      }
    }
  }

  ifEndSecondsCount() {
    var maxCountSeconds = 60;
    if (this.timerSeconds == 0) {
      this.timerMinutes--;
      this.timerSeconds = maxCountSeconds;
      return;
    }
  }

  playSignalTimerSeconds() {
    var signalTenSecondBeforeEndRound = 11;
    var signalEndRound = 1;
    if (this.timerMinutes == 0 && (this.timerSeconds == signalTenSecondBeforeEndRound || this.timerSeconds == signalEndRound) && !this.isRelax) {
      this.playTone(this.selectedTone);
    }
  }

  getAllSportsmans() {
    this.trainerService.getTrainerSportsmans(this.trainerGuid).subscribe(response => {
      this.allSportsmans = response;
    })
  }

  fillRoundsDropdown() {
    let countRounds: number = 100;
    this.rounds = Array.from(Array(countRounds), (x, i) => i + 1);
  }

  fillTimesArraysDropdown() {
    let maxCountSeconds: number = 60;
    let maxCountMinutes: number = 5;
    this.secondsArray = Array.from(Array(maxCountSeconds + 1), (x, i) => i);
    this.minutesRoundArray = Array.from(Array(maxCountMinutes), (x, i) => i + 1);
    this.minutesReluxArray = Array.from(Array(maxCountMinutes), (x, i) => i + 1);
  }

  changeTone($event) {
    this.playTone($event);
  }

  playTone(tone: string) {
    this.synth.triggerAttackRelease(tone, "8n");
  }

  changeDurationMinutes($event) {
    this.timerRoundDurationMinutes = $event;
    this.timerMinutes = $event;
    this.validationFillAllControls();
  }

  changeDurationSeconds($event) {
    this.timerRoundDurationSeconds = $event;
    this.timerSeconds = $event;
    this.validationFillAllControls();
  }

  restartRound() {
    if (!this.isRelax) {
      this.restartTimerTime();
      this.subscription.unsubscribe();
    }
  }

  restartAll() {
    this.restartTimerTime();
    this.timerRound = 0;
    this.isRelax = false;
    this.subscription.unsubscribe();
  }

  validationFillAllControls() {
    if (this.selectedRound != 0 && this.timerRoundDurationMinutes != null && this.timerRoundDurationSeconds != null && this.timerRelaxDurationMinutes != null && this.timerRelaxDurationSeconds != null) {
      this.isDisableControls = false;
      return;
    }
    this.isDisableControls = true;
  }
}
