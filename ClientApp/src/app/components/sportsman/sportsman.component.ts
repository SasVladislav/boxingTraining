import { Component, Inject, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { SportsmanService } from '../../services/sportsman.service';
import { SportUser } from '../../models/entity/sport-user';
import { TrainerService } from '../../services/trainer.service';
import { CreateSportsman } from '../../models/view/create-sportsman';

@Component({
  selector: 'sportsman',
  templateUrl: './sportsman.component.html'
})
export class SportsmanComponent implements OnInit {

  public sportsmansList: SportUser[];
  public createSportsman: CreateSportsman = new CreateSportsman();
  public trainerGuid: string;

  constructor(private trainerService: TrainerService, private sportsmanService: SportsmanService) {
    this.trainerGuid = localStorage.getItem('trainerGuid');
  }
  ngOnInit() {
    this.fillSportsmanTable();
  }
  fillSportsmanTable() {
    this.trainerService.getTrainerSportsmans(this.trainerGuid).subscribe(response => {
      this.sportsmansList = response;
    })
  }
  deleteSportsman(Id: string) {
    this.sportsmanService.Delete(Id).subscribe(response => {
      console.log("sportsman removed");
    })
  }
  createNewSportsman() {
    this.createSportsman.TrainerId = this.trainerGuid;
    this.sportsmanService.Post(this.createSportsman).subscribe(response => {
      this.fillSportsmanTable();
      this.createSportsman = new CreateSportsman();
      console.log("sportsman created");
    })
  }
}
