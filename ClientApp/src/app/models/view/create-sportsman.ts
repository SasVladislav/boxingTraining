import { SportUser } from "../entity/sport-user";

export class CreateSportsman {
  constructor() {
    this.SportsmanInformation = new SportUser();
  }
  SportsmanInformation: SportUser;
  TrainerId: string = "";
}
