import { Injectable } from '@angular/core';
import {LigneTram} from "./ligne-tram";

@Injectable({
  providedIn: 'root'
})
export class LigneService {

  ligneTram;

  constructor() { }

  setLigne(ligne){
    this.ligneTram = ligne;
  }

  getLigne(){
    return this.ligneTram;
  }
}
