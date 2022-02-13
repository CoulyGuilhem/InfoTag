import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import {GpsService} from "../gps.service";
import * as Leaflet from 'leaflet';
import {interval} from "rxjs";


@Component({
  selector: 'app-carte',
  templateUrl: './carte.page.html',
  styleUrls: ['./carte.page.scss'],
})
export class CartePage implements OnInit {

  private longitude;
  private latitude;
  private map: Leaflet.Map;
  private locationInterval;
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

  constructor(private gps: Geolocation, private gpsService: GpsService) { }

  ngOnInit() {
      window.dispatchEvent(new Event('resize'));
      this.gps.getCurrentPosition().then((resp) => {
      this.latitude =  resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.gpsService.setCoords(this.longitude,this.latitude);
      this.leafletMap();
      this.locationInterval = setInterval(() => this.getLocation(),1000)
    }).catch((error) => {
      console.log('Error getting location', error);
    });
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
    this.map = Leaflet.map('mapId').setView([this.latitude,this.longitude], 14);
        /**
      const icon = Leaflet.icon({
          className: "my-custom-pin",
          iconAnchor: [0, 24],
          labelAnchor: [-6, 0],
          popupAnchor: [0, -36],
          html: `<span style=`+this.markerHtmlStyles+` />`
      })/**
      let newMarker = Leaflet.marker([this.latitude, this.longitude], {
          icon: icon
      });
      newMarker.addTo(this.map);*/
    Leaflet.marker([this.latitude,this.longitude]).addTo(this.map);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet',
    }).addTo(this.map);
  }

}
