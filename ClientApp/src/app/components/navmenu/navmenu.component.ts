import { Component } from '@angular/core';
import { DataEventService } from '../../services/DataSeviceHelpers/data-event.service';
import { Router } from '@angular/router';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
  public trainerGuid: string = "";
  public isAuthorize: boolean = false;
  constructor(public router: Router,private dataEventService: DataEventService) {
    this.trainerGuid = localStorage.getItem('trainerGuid');
    if (this.trainerGuid !=null) {
      this.isAuthorize = true;
      this.router.navigate(['sportsman']);
    }
    if (this.trainerGuid == null) {
      this.isAuthorize = false;
      this.router.navigate(['sign-in']);
    }
    dataEventService.change.subscribe(isActive => {
      this.isAuthorize = isActive;
    });
  }
}
