import { Component } from '@angular/core';
import { ThemeServiceService } from '../theme-service.service';

@Component({
  selector: 'app-itineraire',
  templateUrl: 'itineraire.page.html',
  styleUrls: ['itineraire.page.scss']
})
export class ItinerairePage {

  constructor(private theme: ThemeServiceService) {
    this.activeModeSombre();

  }

  public activeModeSombre() {

    this.theme.activeModeSombre();
  }

  public activeModeClair() {
    this.theme.activeModeClair();
  }

}
