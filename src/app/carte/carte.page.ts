import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import {GpsService} from "../gps.service";
import * as Leaflet from 'leaflet';
import {ConnexionAPITAGService} from "../connexion-apitag.service";
@Component({
  selector: 'app-carte',
  templateUrl: './carte.page.html',
  styleUrls: ['./carte.page.scss'],
})
export class CartePage implements OnInit {

  private iconVerte = Leaflet.icon({
    iconUrl: '../../assets/img/pointerVert.png',
    className: "vert",
    iconSize:[20,30],
    iconAnchor: [0,30],
    labelAnchor: [0, 30],
    popupAnchor: [10, -30],
  })

  private iconViolet = Leaflet.icon({
    iconUrl: '../../assets/img/pointerViolet.png',
    className: "violet",
    iconSize:[20,30],
    iconAnchor: [0, 30],
    labelAnchor: [0, 30],
    popupAnchor: [10, -30],
  })

  private longitude;
  private latitude;
  private map: Leaflet.Map;
  private locationInterval;
  private listePoint: Array<Array<number>> = []
  private listeNameArret: Array<string> = []
  private markerHtmlStyles = `
  background-color: '#583470';
  width: 3rem;
  height: 3rem;
  display: block;
  left: -1.5rem;
  top: -1.5rem;
  position: relative;
  border-radius: 3rem 3rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`

  constructor(private gps: Geolocation, private gpsService: GpsService, private apiConnexion: ConnexionAPITAGService) { }

  ngOnInit() {}

  setPoint(coords,name,icon){
    Leaflet.marker([coords[1],coords[0]], {icon: icon}).addTo(this.map).bindPopup(name);
  }

  ionViewDidEnter(){


    window.dispatchEvent(new Event('resize'));
    this.gps.getCurrentPosition().then((resp) => {
    this.latitude =  resp.coords.latitude;
    this.longitude = resp.coords.longitude;
    this.gpsService.setCoords(this.longitude,this.latitude);
    this.leafletMap();
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    // Get all point
    this.apiConnexion.getDescriptionTypes('2').subscribe(pointArret => {
      this.listeNameArret = [];
      this.listePoint = [];
      for(let i = 0; i < pointArret['features'].length ; i++) {
        if (pointArret['features'][i]['properties']['id'].includes("SEM:")
        ) {
          this.listePoint.push(pointArret['features'][i]['geometry']['coordinates'])
          this.listeNameArret.push(pointArret['features'][i]['properties']['LIBELLE'])
        } else {
          return null;
        }
        this.setPoint(this.listePoint[i],this.listeNameArret[i],this.iconVerte);
      }
    });
    this.apiConnexion.getDescriptionTypes('1').subscribe(pointAgence => {
      console.log(pointAgence)
      for(let i = 0; i <pointAgence['features'].length ; i++) {
        this.listePoint.push(pointAgence['features'][i]['geometry']['coordinates'])
        this.listeNameArret.push(pointAgence['features'][i]['properties']['NOM']+" : Telephone :"+
            pointAgence['features'][i]['properties']['TELEPHONE'] + " : Adresse :"+
            pointAgence['features'][i]['properties']['RUE']+" Lundi :" +
            pointAgence['features'][i]['properties']['HORAIRES_LUNDI'] + " Mardi :"+
            pointAgence['features'][i]['properties']['HORAIRES_MARDI'] + " Mercredi :"+
            pointAgence['features'][i]['properties']['HORAIRES_MERCREDI'] + " Jeudi :"+
            pointAgence['features'][i]['properties']['HORAIRES_JEUDI'] + " Vendredi :"+
            pointAgence['features'][i]['properties']['HORAIRES_VENDREDI']
        )
        this.setPoint(this.listePoint[i],this.listeNameArret[i],this.iconViolet);
      }
    });

    this.locationInterval = setInterval(() => this.getLocation(),30000)
  }

    ionViewDidLeave(){
      console.log("leave")
      clearInterval(this.locationInterval);
      this.map = null;
    }


  getLocation(){
      let watch = this.gps.watchPosition();
      console.log("gps coords changed")
      watch.subscribe((data) => {
          // data can be a set of coordinates, or an error (if an error occurred).
          if ("coords" in data) {
              this.latitude = data.coords.latitude;
              this.longitude = data.coords.longitude;
              this.gpsService.setCoords(this.longitude,this.latitude);
          }
      });
  }

  leafletMap() {
    console.log("test")
    this.map = Leaflet.map('mapId').setView([this.latitude,this.longitude], 14);
    Leaflet.marker([this.latitude,this.longitude]).addTo(this.map);
    Leaflet.tileLayer('https://data.mobilites-m.fr/carte-dark/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet',
    }).addTo(this.map);
      this.map.options.minZoom = 2;
      this.map.options.maxZoom = 18;
    this.apiConnexion.getListeLigneTrace().subscribe(trace => {
      console.log(trace)
      for(let j = 0; j < trace['features'].length;j++){
        let coordRanges = []
        if('coordinates' in trace['features'][j]['geometry']){
          for(let i = 0 ; i < trace['features'][j]['geometry']['coordinates'][0].length; i++){
            coordRanges.push([trace['features'][j]['geometry']['coordinates'][0][i][1],trace['features'][j]['geometry']['coordinates'][0][i][0]])
          }
          Leaflet.polyline(coordRanges, {color: this.parseColor(trace['features'][j]['properties']['COULEUR'])}).addTo(this.map).bindPopup(trace['features'][j]['properties']['NUMERO']);
        }
      }
    })
  }
  parseColor(colorString){
    let colorInt =[]
    let colorSplit = colorString.split(",")
    let color ='#'
    for(let i = 0; i < colorSplit.length; i++){
      colorInt.push(Number(colorSplit[i]))
      color = color + colorInt[i].toString(16);
      if(colorInt[i] === 0){
        color = color + '0'
      }
    }
    return color
  }

}
