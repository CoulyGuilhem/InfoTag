import { Component, OnInit } from '@angular/core';
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

  public horaireChoisie;
  private ligne;
  private arret;
  private arretLigne: Array<Arret> = [];

  constructor(private apiConnexion: ConnexionAPITAGService, private ligneService: LigneService,private router: Router) { }
  ngOnInit() {}

  ionViewDidEnter() {
    this.loadArret((new Date).getTime());
  }
  loadArret(time: number){
    this.ligne = this.ligneService.getLigne()
    console.log(this.ligne)
    if (this.ligne != null) {
      this.apiConnexion.listeArretEnFonctionligneAvecHeureAffichage(this.ligne, time).subscribe(dataProximite => {
        console.log(dataProximite)
        this.arret = dataProximite[0]['arrets'];
        console.log(this.arret)
        for (let i = 0; i < this.arret.length; i++) {
          const addArret: Arret = {
            stopId: this.arret[i]['stopId'],
            stopName: this.arret[i]['stopName'],
            trips: this.arret[i]['trips'],
            lat: this.arret[i]['lat'],
            lon: this.arret[i]['lon']
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
    console.log("PUTAIN DE MERDE :"+new Date(value).getTime())
    this.loadArret(new Date(value).getTime());
  }

  horaireCalculed(): string{
    if(this.arret != null){
      let horaires: string = "";
      let date = new Date();
      date.setHours(0,0,0,0);


      for(let j = 0; j < this.arret.length ; j++){
        horaires = ""
        for(let i = 0;i < (this.arret[j].trips).length; i ++){
          let passage = new Date(date.getTime()+this.arret[j].trips[i]*1000)
          horaires = horaires + "|" + formatDate(passage,'HH:mm','en-US')
        }
      }
      console.log(horaires)
      return horaires
    } else {
      return null
    }
  }

  returnToLigneInfo(){
    this.router.navigate(['/ligne-info']);
  }
}
