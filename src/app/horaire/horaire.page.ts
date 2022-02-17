import {Component, LOCALE_ID, OnInit} from '@angular/core';
import {Arret} from "../arret";
import {ConnexionAPITAGService} from "../connexion-apitag.service";
import {LigneService} from "../ligne.service";
import {Router} from "@angular/router";
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.page.html',
  styleUrls: ['./horaire.page.scss'],
})
export class HorairePage implements OnInit {

  public horaireChoisie = new Date().getTime();
  private ligne;
  private arret;
  private arretLigne: Array<Arret> = [];
  private sensCirculation: number = 0;

  constructor(private apiConnexion: ConnexionAPITAGService, private ligneService: LigneService,private router: Router) { }
  ngOnInit() {}

  ionViewDidEnter() {
    this.loadArret((new Date).getTime());
  }

  changeCirculation(){
    if(this.sensCirculation == 0){
      this.sensCirculation = 1;
    } else {
      this.sensCirculation = 0;
    }
    this.heureChange(this.horaireChoisie)
  }

  loadArret(time: number){
    this.ligne = this.ligneService.getLigne()
    console.log(new Date(time))
    if (this.ligne != null) {
      this.apiConnexion.listeArretEnFonctionligneAvecHeureAffichage(this.ligne, time+3600000).subscribe(dataProximite => {
        console.log(dataProximite)
        this.arret = dataProximite[this.sensCirculation]['arrets'];
        console.log(this.arret)
        this.arretLigne = [];
        for (let i = 0; i < this.arret.length; i++) {
          let trips
          console.log(this.arret[i])
          if(this.arret[i]['trips'].length !== 0){
            trips = this.arret[i]['trips']
          } else {
            trips = null
          }

          let addArret: Arret = {
            stopId: this.arret[i]['stopId'],
            stopName: this.arret[i]['stopName'],
            trips: trips,
            lat: this.arret[i]['lat'],
            lon: this.arret[i]['lon']
          }
          this.arretLigne.push(addArret)
        }
        if(this.arretLigne.length === 0){
          let addArret: Arret = {
            stopId: null,
            stopName: 'Aucune information disponible',
            trips: null,
            lat: null,
            lon: null
          }
          this.arretLigne.push(addArret)
        }
      });
    } else {
      console.log("ligne == null");
    }
  }

  debugInfo(){
    if(this.ligne != null){
      return this.ligne.longname
    } else {
      return "ERROR"
    }
  }

  heureChange(value){
    this.horaireChoisie = new Date(value).getTime()
    this.loadArret(this.horaireChoisie);
  }

  horaireCalculed(arret): string{
    if(this.arret != null){
      let horaires: string = "";
      let date = new Date();
      date.setHours(0,0,0,0);
      if(arret.trips === null){
        horaires = 'Aucune information disponible  '
      } else {
        for(let i = 0;i < (arret.trips).length - 1; i ++){
          let passage = new Date(date.getTime()+arret.trips[i]*1000)
          if(passage instanceof Date && !isNaN(passage.getTime())){
            horaires = horaires + formatDate(passage,'HH:mm','en') + " | "
          } else {
            horaires = horaires + ' - ' + " | ";
          }
        }
      }
      return horaires.substring(0, horaires.length-2)
    } else {
      return null
    }
  }

  returnToLigneInfo(){
    this.router.navigate(['/ligne-info']);
  }
}
