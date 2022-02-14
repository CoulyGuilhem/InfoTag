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
}


