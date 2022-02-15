import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnexionAPITAGService {
  private detail;


  constructor(private http: HttpClient) {
    this.detail = true;
  }

  private URL: string = "https://data.mobilites-m.fr/api/";

  public getListeLigneTransports(): Observable<any> {
    const URL = this.URL + "routers/default/index/routes";
    return this.http.get(URL);
  }

  public getLigneAproximite(ecart: number, longitude: number, latitude: number) {
    const URL = this.URL + "linesNear/json?x=" + longitude + "&y=" + latitude + "&dist=" + ecart + "&details=" + this.detail;
    return this.http.get(URL);
  }

  public getLigneAproximitePasEcart(longitude: number, latitude: number) {
    const URL = this.URL + "linesNear/json?x=" + longitude + "&y=" + latitude + "&dist=" + 300 + "&details=" + this.detail;
    return this.http.get(URL);
  }

  public getDescriptionTypes(type) {
    let POI;
    switch (type) {
      case 1:
        POI = "agenceM";
        break;
      case 2:
        POI = "arret";
        break;
      case 3:
        POI = "citelib";
        break;
      case 4:
        POI = "dat";
        break;
      case 5:
        POI = "depositaire";
        break;
      case 6:
        POI = "hamo";
        break;
      case 7:
        POI = "lieux";
        break;
      case 8:
        POI = "MVA";
        break;
      case 9:
        POI = "MVC";
        break;
      case 10:
        POI = "PAR";
        break;
      case 11:
        POI = "PKG";
        break;
      case 12:
        POI = "PMV";
        break;
      case 13:
        POI = "pointArret";
        break;
      case 14:
        POI = "pointService";
        break;
      default:
        POI = "agenceM";

        const URL = this.URL + "bbox/json?types=" + POI;
        return this.http.get(URL);
    }
  }

  // Liste des arrets en fonction d'une ligne. Permet aussi de renvoyer l'heure de passage des 3 ou 4 prochains bus
  // timeStamp = null -> heure actuelle
  //Passage transport ( tableau lettre/numero ligne pour la TAG, car+idLigne pour TransIsÃ¨re, ou SNCF+identifiant pour la SNCF)
  public listeArretEnFonctionligneAvecHeureAffichage(transport, timeStamp) {
    if(timeStamp == null){
      const URL = this.URL + "ficheHoraires/json?route=" + transport.id;
      return this.http.get(URL);
    } else {
      const URL = this.URL + "ficheHoraires/json?route=" + transport.id + "&time=" + timeStamp;
      return this.http.get(URL);
    }
  }

  //recherche de point d'arret
  //renvoit un tableau contenant l'id de l'arret
  public rechercheDePointArret(nomArret) {
    const URL = this.URL + "findType/json?types=arret&query=" + nomArret;
    return this.http.get(URL);
  }
}


