import {SportUser } from "../entity/sport-user";
import { SignIn } from "./sign-in";

export class TrainerView {
    constructor() {
        this.GeneralInformation = new SignIn();
        this.AuthenticateInformation = new SportUser();
    }
    GeneralInformation: SignIn;
    AuthenticateInformation: SportUser;
}
