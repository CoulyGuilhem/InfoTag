import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from "@angular/router";
import { LocaleDatabaseService } from '../locale-database.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.page.html',
  styleUrls: ['./compte.page.scss'],
})
export class ComptePage {
  private email: String;
  private password: String;
  private stockage: String;

  constructor(public alertController: AlertController, private router: Router, private BDD: LocaleDatabaseService) {
  }

  ionViewWillEnter() {
    this.stockage = "";
    this.BDD.get('mail').then((val) => {
      if (val) {
        this.stockage = val;
        console.log(this.stockage);
        if (this.stockage !== "") {
          this.router.navigate(['/tabs/user']);
        }
      }
    })
  }

  public connexion() {
    console.log(this.password);
    console.log(this.email);
    var pointeur = this;
    //1. on verifie que les champs sont remplis
    if (this.email === undefined || this.password === undefined) {
      this.ChampsNonRempliAlert();
    } else {
      //2. on lance une requete pour savoir si le compte existe
      var requete = new XMLHttpRequest();
      requete.onreadystatechange = function () {
        if (this.readyState == 4) {

          let jsondata = JSON.parse(requete.responseText);
          console.log(jsondata);
          if (jsondata.mdpValide) {
            pointeur.BDD.set('mail', pointeur.email);
            pointeur.router.navigate(['/tabs/user']);
          }
          else if (jsondata.user.length == 0 && !jsondata.mdpValide) {
            pointeur.email = undefined;
            pointeur.password = undefined;
            pointeur.utilisateurInexistantAlert();

          }
          else if (pointeur.email == "" || pointeur.password == "") {
            pointeur.email = undefined;
            pointeur.password = undefined;
            pointeur.ChampsNonRempliAlert();
          }
          else {
            pointeur.email = undefined;
            pointeur.password = undefined;
            pointeur.mdpIncorrectAlert();
          }
        }
      };
      requete.open('POST', 'http://localhost/ionicTAG/Controler/utilisationBDD.php', true);
      requete.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      requete.send("fonctionnalite=rechercher un utilisateur&mail=" + this.email + "&password=" + this.password);
    }

  }

  async ChampsNonRempliAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention',
      message: 'Veuillez remplir tous les champs',
      buttons: ['OK']
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async mdpIncorrectAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention',
      message: 'Mot de passe erroné',
      buttons: ['OK']
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async utilisateurInexistantAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention',
      message: 'Utilisateur inexistant',
      buttons: ['OK']
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
  }



}
