import { BaseEntity } from "./base-entity";

export class RoundStatistic extends BaseEntity {
    SportUserId: string = "";
    CountRounds: number = 0;
    DateRecord: string = "";
}
