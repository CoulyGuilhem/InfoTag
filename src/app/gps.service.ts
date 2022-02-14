import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GpsService {

  private longitude: number;
  private latidude: number;

  constructor() { }

  setCoords(longitude: number, latitude: number){
    this.latidude = latitude;
    this.longitude = longitude;
  }

  getCoords(){
    return [this.latidude, this.longitude];
  }
}
