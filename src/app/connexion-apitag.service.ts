import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConnexionApitagService {
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

  public horaireArret() {

  }


  //La liste des arrets en fonction des lignes
  public listeArretEnFonctionligne(transport) {
    if (transport) {
      let id = "";
      if (transport['type'] === "TAG") {
        id = "SEM:" + transport['ligne'];
      } else if (transport['type'] === "transiere") {
        id = "C38:" + transport['ligne'];
      } else if (transport['type'] === "SNCF") {
        id = "SNC:" + transport['ligne'];
      } else {
        return null;
      }
      if (id && id !== "") {
        const URL = this.URL + "ficheHoraires/json?route=" + id;
        return this.http.get(URL);
      }
    } else {
      return null;
    }
  }

  //Passage transport ( tableau lettre/numero ligne pour la TAG, car+idLigne pour TransIsère, ou SNCF+identifiant pour la SNCF)
  public listeArretEnFonctionligneAvecHeureAffichage(transport, timeStamp) {
    if (timeStamp === null) {
      timeStamp = Date.now();
    }
    if (transport) {
      let id = "";
      if (transport['type'] === "TAG") {
        id = "SEM:" + transport['ligne'];
      } else if (transport['type'] === "transiere") {
        id = "C38:" + transport['ligne'];
      } else if (transport['type'] === "SNCF") {
        id = "SNC:" + transport['ligne'];
      } else {
        return null;
      }
      if (id && id !== "") {
        const URL = this.URL + "ficheHoraires/json?route=" + id + "&time=" + timeStamp;
        return this.http.get(URL);
      }
    } else {
      return null;
    }
  }

  //recherche de point d'arret
  //renvoit un tableau contenant l'id de l'arret
  public rechercheDePointArret(nomArret) {
    const URL = this.URL + "findType/json?types=arret&query=" + nomArret;
    return this.http.get(URL);
  }

  //Les horaires en fonction de la ligne et de l'arret en particulier




  //horaire au poteau
  public listeHorairesArret(idArret) {
    const URL = this.URL + "routers/default/index/stops/{SEM,C38}:id/stoptimes/" + nomArret;
    return this.http.get(URL);
  }


}
