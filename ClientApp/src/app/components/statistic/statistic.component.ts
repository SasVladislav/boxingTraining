import { Component, OnInit } from '@angular/core';
import { SportsmanService } from '../../services/sportsman.service';
import { TrainerService } from '../../services/trainer.service';
import { SportUser } from '../../models/entity/sport-user';
import { UserDataStoreService } from '../../services/DataSeviceHelpers/data-store.service';
import { FilterRoundsStatistic } from '../../models/view/filter-round-statistic';
import { RoundStatisticService } from '../../services/round-statistic.service';
import { RoundStatistic } from '../../models/entity/round-statistic';

@Component({
  selector: 'statistic',
  templateUrl: './statistic.component.html'
})
export class StatisticComponent{
  public selectedSportsman: SportUser;
  public sportsmansList = [];
  public sportsmanRoundStatisticList: RoundStatistic[] = [];
  public trainerInformation: SportUser;
  public filterRoundsStatistic: FilterRoundsStatistic;

  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];

  public totalRounds: number = 0;

  //---------------------

  public lineChartOptions: any = {
    responsive: false
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  constructor(private userDataStoreService: UserDataStoreService, private trainerService: TrainerService, private sportsmanService: SportsmanService,
    private roundStatisticService: RoundStatisticService) {
    var trainerGuid = localStorage.getItem('trainerGuid');
    this.trainerService.getTrainer(trainerGuid).subscribe(user => {
      this.trainerInformation = user;
      this.selectedSportsman = this.trainerInformation;
      this.setDefaultRoundStatisticModel();
      this.fillSportsmanDropdown();
      this.getSportsmanRoundStatistic();
    });
  }

  fillSportsmanDropdown() {
    this.trainerService.getTrainerSportsmans(this.trainerInformation.Id).subscribe(response => {
      this.sportsmansList = response;
    })
  }

  setDefaultRoundStatisticModel() {
    this.filterRoundsStatistic = new FilterRoundsStatistic();
    this.filterRoundsStatistic.SportUserId = this.selectedSportsman.Id;
    this.filterRoundsStatistic.DateFrom = new Date().toLocaleDateString();
    this.filterRoundsStatistic.DateTo = new Date().toLocaleDateString();
  }

  filterByDate(key: string) {
    if (key=="Day") {
      this.setFilterDateRange(new Date().toLocaleDateString(), new Date().toLocaleDateString());
    }
    if (key == "Week") {
      var dateFrom = new Date();
      dateFrom.setDate(new Date().getDate() - 7);
      this.setFilterDateRange(dateFrom.toLocaleDateString(), new Date().toLocaleDateString());
    }
    if (key == "Month") {
      var dateFrom = new Date();
      dateFrom.setMonth(new Date().getMonth() - 1);
      this.setFilterDateRange(dateFrom.toLocaleDateString(), new Date().toLocaleDateString());
    }
    this.getSportsmanRoundStatistic();
  }

  setFilterDateRange(dateFrom: string, dateTo: string) {
    this.filterRoundsStatistic.DateFrom = dateFrom;
    this.filterRoundsStatistic.DateTo = dateTo;
  }

  getSportsmanRoundStatistic() {
    this.filterRoundsStatistic.SportUserId = this.selectedSportsman.Id;
    this.roundStatisticService.PostFilterRoundsStatistic(this.filterRoundsStatistic).subscribe(response => {
      this.sportsmanRoundStatisticList = response.sort(
        function (a, b) { return (a.DateRecord > b.DateRecord) ? 1 : ((b.DateRecord > a.DateRecord) ? -1 : 0); });
      this.lineChartData[0] = { data: this.sportsmanRoundStatisticList.map(x => x.CountRounds), label: this.selectedSportsman.FirstAndLastName };
      this.lineChartLabels = this.sportsmanRoundStatisticList.map(x => x.DateRecord);
      this.totalRounds = this.sportsmanRoundStatisticList.map(x => x.CountRounds).reduce((a,b) => a+b,0)
    })
  }

}
