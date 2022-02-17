import { Inject, Injectable, RendererFactory2, Renderer2 } from '@angular/core';
import { LocaleDatabaseService } from './locale-database.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeServiceService {
  private theme: string;
  private render: Renderer2;


  constructor(private BDD: LocaleDatabaseService, private renderFact: RendererFactory2, @Inject(DOCUMENT) private document: Document) {
    this.render = this.renderFact.createRenderer(null, null);
    //acceder a la BDD. En fonction on lance une des fonctions
    //this.activeModeSombre();
  }

  public activeModeSombre() {

    this.render.addClass(this.document.body, 'dark-theme');
  }

  public activeModeClair() {
    this.render.removeClass(this.document.body, 'dark-theme');
  }

}
