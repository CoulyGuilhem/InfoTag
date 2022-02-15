import { Component, OnInit } from '@angular/core';
import {ConnexionAPITAGService} from "../connexion-apitag.service";
import {Observable} from "rxjs";
import {LigneBus} from "../ligne-bus";
import {LigneTram} from "../ligne-tram";

@Component({
  selector: 'app-lignes',
  templateUrl: './lignes.page.html',
  styleUrls: ['./lignes.page.scss'],
})
export class LignesPage implements OnInit {

  private listeLigneData: Observable<any>;
  private listeLigneTram: Array<LigneTram> = [];
  private listeLigneTypeBus: Array<String> = [];

  private listeLigneNavette: Array<LigneBus> = [];
  private listeLigneChrono: Array<LigneBus> = [];
  private listeLigneProximo: Array<LigneBus> = [];

  private listeLigneFlexo: Array<LigneBus> = [];
  private listeLigneTougo: Array<LigneBus> = [];
  private listeLigneVoiron: Array<LigneBus> = [];

  private listeLigneReg: Array<LigneBus> = [];
  private listeLigneRegexpress: Array<LigneBus> = [];
  private listeLigneMco: Array<LigneBus> = [];

  constructor(private apiConnexion: ConnexionAPITAGService) { }

  ngOnInit(): void {
    this.apiConnexion.getListeLigneTransports().subscribe(data => {
      for(let i = 0; i < data.length; i++){
        switch(data[i]['mode']){
          case("TRAM"):{
            const ligne: LigneTram = {
              id: data[i]['id'],
              color: "#"+data[i]['color'],
              longname: data[i]['longName'],
              shortname: data[i]['shortName'],
              type: data[i]['type'],
              colortext:data[i]['textColor']
            }
            this.listeLigneTram.push(ligne);
            break;

          } case ("BUS"): {
            const ligne: LigneBus = {
              id: data[i]['id'],
              color: "#"+data[i]['color'],
              longname: data[i]['longName'],
              shortname: data[i]['shortName'],
              type: data[i]['type'],
              colortext:data[i]['textColor']
            }
            console.log(ligne.shortname);
            this.listeLigneTypeBus.push(data[i]['type'])
            this.busType(ligne);
          }
          default:
            break;
        }
      }
      console.log("Zebi"+this.listeLigneTypeBus.toString());
      console.log(this.listeLigneNavette.toString());
      console.log(this.listeLigneTram.toString());
    });
  }
  busType(ligne: LigneBus){
    switch (ligne.type){
      case("NAVETTE"):{
        this.listeLigneNavette.push(ligne);
        break;
      }
      case("CHRONO"):{
        this.listeLigneChrono.push(ligne);
        break;
      }
      case("PROXIMO"):{
        this.listeLigneProximo.push(ligne);
        break;
      }
      case("FLEXO"):{
        this.listeLigneFlexo.push(ligne);
        break;
      }
      case("Structurantes"):{
        this.listeLigneTougo.push(ligne);
        break;
      }
      case("Secondaires"):{
        this.listeLigneTougo.push(ligne);
        break;
      }
      case("Interurbaines"):{
        this.listeLigneVoiron.push(ligne);
        break;
      }
      case("Urbaines"):{
        this.listeLigneVoiron.push(ligne);
        break;
      }
      case("C38_AUTRE"):{
        this.listeLigneReg.push(ligne);
        break;
      }
      case("C38_STRUCT"):{
        this.listeLigneRegexpress.push(ligne);
        break;
      }
      case("MCO"):{
        this.listeLigneMco.push(ligne);
        break;
      }




    }
  }

  ligneGetNameTram(ligne: LigneTram): string{
    console.log(ligne.shortname)
    return ligne.shortname;
  }
  ligneGetNameBus(ligne: LigneBus): string{
    console.log(ligne.shortname)
    return ligne.shortname;
  }


  styleBus(ligne: LigneBus){
    return "--background:"+ligne.color+"; color:#"+ligne.colortext;
  }

  styleTram(ligne: LigneTram){
    return "--background:"+ligne.color+"; color:#"+ligne.colortext;
  }

}