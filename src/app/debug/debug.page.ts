import { Component, OnInit } from '@angular/core';
import { ConnexionAPITAGService } from '../connexion-apitag.service';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.page.html',
  styleUrls: ['./debug.page.scss'],
})
export class DebugPage implements OnInit {

  private listeLigneTransport;
  private lignesAProximite;

  //attributs pour les tests
  private latitude: number;
  private longitude: number;
  private ecart: number;

  constructor(private session: ConnexionAPITAGService) {
    this.latitude = 45.1927399;
    this.longitude = 5.7177945;
    this.getToutesLesLignes().subscribe(data => {
      this.listeLigneTransport = data;
      console.log(this.listeLigneTransport);
    });
  }

  ngOnInit() {
  }

  //OK
  public getToutesLesLignes() {
    const LIGNES = this.session.getListeLigneTransports();
    return LIGNES;
  }

  //OK
  public getLignesAproximite(ecart: number, longitude: number, latitude: number) {
    const LIGNES = this.session.getLigneAproximite(ecart, longitude, latitude);
    return LIGNES;
  }

  //OK
  public getLignesAproximitePasEcart(longitude: number, latitude: number) {
    const LIGNES = this.session.getLigneAproximitePasEcart(longitude, latitude);
    return LIGNES;
  }






  //METHODES DE TEST
  public testDesMethodes() {
    this.getLignesAproximite(this.ecart, this.longitude, this.latitude).subscribe(dataProximite => {
      this.lignesAProximite = dataProximite;
      console.log(this.lignesAProximite);
    });
  }

}
