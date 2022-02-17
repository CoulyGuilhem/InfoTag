import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from "@angular/router";
import { LocaleDatabaseService } from '../locale-database.service';
import { GpsService } from '../gps.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-signalement',
  templateUrl: './signalement.page.html',
  styleUrls: ['./signalement.page.scss'],
})
export class SignalementPage implements OnInit {
  private ligne: string;
  private incident: string;
  private mailEmetteur: string;
  private lat;
  private lon;

  constructor(public alertController: AlertController, private router: Router, private BDD: LocaleDatabaseService, private gpsService: GpsService, private gps: Geolocation) {
  }


  ngOnInit() {
    this.gps.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;
      this.gpsService.setCoords(this.lon, this.lat);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  public soumettre() {

    var tabGPS = this.gpsService.getCoords();
    this.lat = tabGPS[0];
    this.lon = tabGPS[1];
    var pointeur = this;
    this.BDD.get('mail').then((val) => {
      if (val) {
        this.mailEmetteur = val;
        if (this.mailEmetteur !== "") {
          let date1 = new Date();

          let dateLocale = date1.toLocaleString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          });
          //On passe le mail, le gps, le timestamp, la ligne et l incident
          const queryString = "fonctionnalite=signalement&mail=" + this.mailEmetteur + "&lat=" + this.lat + "&lon=" + this.lon + "&ligne=" + this.ligne + "&time=" + dateLocale + "&incident=" + this.incident;

          var requete = new XMLHttpRequest();
          requete.onreadystatechange = function () {
            if (this.readyState == 4) {

              let jsondata = JSON.parse(requete.responseText);
              console.log(jsondata);
              pointeur.remerciementAlert();
            }

          };
          requete.open('POST', 'http://localhost/ionicTAG/Controler/utilisationBDD.php', true);
          requete.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
          requete.send(queryString);
        }
      }
    })

  }

  async remerciementAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'message',
      message: 'Merci pour votre signalement. Les équipes de la TAG vont traiter en priorité cet incident.' + "<br>" + '<ion-button small href="/tabs/carte" >OK</ion-button',
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

}
