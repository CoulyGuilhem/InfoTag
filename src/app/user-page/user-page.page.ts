import { Component, OnInit } from '@angular/core';
import { LocaleDatabaseService } from '../locale-database.service';
import { Router } from "@angular/router";
import { ThemeServiceService } from '../theme-service.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.page.html',
  styleUrls: ['./user-page.page.scss'],
})
export class UserPagePage implements OnInit {
  private mode;
  private stockage;
  private texte;

  constructor(private router: Router, private BDD: LocaleDatabaseService, private theme: ThemeServiceService) {


  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    var pointeur = this;
    this.BDD.get('mail').then((val) => {
      if (val) {
        this.BDD.get('theme').then((valTheme) => {
          if (valTheme) {
            if (valTheme === "light") {
              this.mode = false;
              this.texte = "Theme clair";
              this.activeModeClair();
            }
            else {
              this.mode = true;
              this.texte = "Thème foncé";
              this.activeModeSombre();
            }
          }
        });
      }
    });
  }

  public switch() {
    if (this.mode) {
      this.texte = "Thème clair";
      this.BDD.set("theme", "light");
      this.activeModeClair();
    }
    else {
      this.texte = "Theme foncé";
      this.BDD.set("theme", "dark");
      this.activeModeSombre();
    }
  }

  public deconnexion() {
    this.BDD.get('mail').then((val) => {
      if (val) {
        this.stockage = val;
        this.BDD.set('mail', "");
        this.router.navigate(['/tabs/compte']);
      }
    })
  }

  public activeModeSombre() {

    this.theme.activeModeSombre();
  }

  public activeModeClair() {
    this.theme.activeModeClair();
  }


}
