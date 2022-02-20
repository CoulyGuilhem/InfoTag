import { Component, OnInit } from '@angular/core';
import {LigneService} from "../ligne.service";
import {ConnexionAPITAGService} from "../connexion-apitag.service";
import {Router} from "@angular/router";
import {Arret} from "../arret";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-ligne-info',
  templateUrl: './ligne-info.page.html',
  styleUrls: ['./ligne-info.page.scss'],
})
export class LigneInfoPage implements OnInit {
  private arret
  private arret2
  private horaire1 = []
  private horaire2 = []
  private passageTexte1
  private passageTexte2
  private numeroArret
  private ligne
  private arretLigne : Array<Arret> =[];
  private searchBar: string ="";

  constructor(private apiConnexion: ConnexionAPITAGService, private ligneService: LigneService,private router: Router) { }

  ngOnInit() {}

  showTheoricPassage(arret){
    this.horaire1 = []
    this.horaire2 = []
    this.apiConnexion.listeHorairesArret(arret.stopId).subscribe(data => {

      if(data['length'] !== 0) {
        for (let j = 0; j < data[0]['times'].length; j++) {
          this.horaire1.push(data[0]['times'][j]['realtimeArrival'])
        
        }
        this.passageTexte1 = data[0]['times'][0]['headsign']+' : '+this.horaireCalculed(this.horaire1)
      }
    })
    for(let i = 0; i < this.arret2.length; i++){
    
      if(arret.stopName == this.arret2[i]['stopName']){
        this.numeroArret = arret
        this.apiConnexion.listeHorairesArret(this.arret2[i].stopId).subscribe(data2 => {
          console.log('test')
          if(data2['length'] !== 0){
            for(let j = 0; j < data2[0]['times'].length; j++){
              this.horaire2.push(data2[0]['times'][j]['realtimeArrival'])
              
            }
            this.passageTexte2 = data2[0]['times'][0]['headsign']+' : '+this.horaireCalculed(this.horaire2)
          }

        })
      }
    }
  }

  horaireCalculed(arret): string{
    if(this.arret.length !== 0){
      let horaires: string = "";
      let date = new Date();
      date.setHours(0,0,0,0);
      for(let i = 0;i < arret.length; i ++){
        let passage = new Date(date.getTime()+arret[i]*1000)
        if(passage instanceof Date && !isNaN(passage.getTime())){
          let time = (passage.getTime() - new Date().getTime()) / 60000
          console.log(time)
          if( time > 59){
            horaires = horaires + ' < 1h | '
          } else {
            horaires =  horaires + " | " +(Number(formatDate(passage,'mm','en')) - Number(formatDate(new Date(),'mm','en'))) + " min"
          }

        } else {
          horaires = horaires + ' - ' + " | ";
        }
      }
      return horaires.substring(0, horaires.length-2)
    } else {
      return 'aucune information disponible'
    }
  }

  ionViewDidEnter(){
    this.arretLigne = []
    this.numeroArret = null
    this.ligne = this.ligneService.getLigne()
    if(this.ligne != null){
      this.apiConnexion.listeArretEnFonctionligneAvecHeureAffichage(this.ligne,null).subscribe(dataProximite => {
        
        this.arret = dataProximite[0]['arrets'];
        this.arret2 = dataProximite[1]['arrets'];
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
