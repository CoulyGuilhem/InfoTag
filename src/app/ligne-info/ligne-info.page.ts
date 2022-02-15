import { Component, OnInit } from '@angular/core';
import {LigneService} from "../ligne.service";
import {ConnexionAPITAGService} from "../connexion-apitag.service";
import {Router} from "@angular/router";
import {Arret} from "../arret";

@Component({
  selector: 'app-ligne-info',
  templateUrl: './ligne-info.page.html',
  styleUrls: ['./ligne-info.page.scss'],
})
export class LigneInfoPage implements OnInit {
  private arret
  private ligne
  private arretLigne : Array<Arret> =[];
  private searchBar: string ="";

  constructor(private apiConnexion: ConnexionAPITAGService, private ligneService: LigneService,private router: Router) { }

  ngOnInit() {}

  ionViewDidEnter(){
    this.ligne = this.ligneService.getLigne()
    if(this.ligne != null){
      this.apiConnexion.listeArretEnFonctionligneAvecHeureAffichage(this.ligne,null).subscribe(dataProximite => {
        console.log(dataProximite)
        this.arret = dataProximite[0]['arrets'];
        for(let i = 0;i<this.arret.length;i++){
          let trips;
          let jsonString = JSON.stringify(this.arret[i]);
          if(jsonString.indexOf('trips')) {
            trips = this.arret[i]['trips']
          } else {
            trips = null
          }
          const addArret: Arret = {
            stopId: this.arret[i]['stopId'],
            stopName: this.arret[i]['stopName'],
            trips: trips,
            lat: this.arret[i]['lat'],
            lon: this.arret[i]['lon']
          }
          this.arretLigne.push(addArret)
        }
        //console.log(this.arretLigne[1].trips.toString());
      });
    } else {
      console.log("Ligne == null")
    }
  }

  debugInfo(){
    if(this.ligne != null){
      return this.ligne.longname
    } else {
      return "ERROR"
    }
  }
  returnListeLigne(){
    this.router.navigate(['/tabs/lignes']);
  }

  goToHorraire(){
    this.router.navigate(['horaire']);
  }
}
