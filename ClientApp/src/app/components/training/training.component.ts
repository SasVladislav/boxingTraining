import { Component } from '@angular/core';

@Component({
  selector: 'training',
  templateUrl: './training.component.html'
})
export class TrainingComponent {
    public countTimers = 1;
    public timersArray = [];
    public numbers = [];

    constructor(){
      this.numbers = Array.from(Array(11), (x, i) => i);
      this.fillTimersArray();
    }

    public onChange($event) {
      this.fillTimersArray();
    }

  public fillTimersArray() {
    this.timersArray = Array(this.countTimers).fill(1);
  }
}
