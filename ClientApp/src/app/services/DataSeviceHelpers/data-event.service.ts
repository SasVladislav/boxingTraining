import { Injectable, EventEmitter, Output } from "@angular/core";

@Injectable()
export class DataEventService {

  isAuthorize = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  toggle() {
    this.isAuthorize = localStorage.getItem('trainerGuid')!=null;
    this.change.emit(this.isAuthorize);
  }

}
