import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LocaleDatabaseService } from '../locale-database.service';

@Component({
  selector: 'app-creation-compte-user',
  templateUrl: './creation-compte-user.page.html',
  styleUrls: ['./creation-compte-user.page.scss'],
})
export class CreationCompteUserPage implements OnInit {
  private email: string;
  private password: string;
  private passwordVerif: string;

  constructor(public alertController: AlertController, private BDD: LocaleDatabaseService) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention',
      subHeader: 'mots de passe non identiques',
      message: 'Veuillez saisir deux mots de passe identiques',
      buttons: ['OK']
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async compteCreeAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Compte crée',
      message: 'Votre compte utilisateur a été crée' + "<br>" + '<ion-button small href="/tabs/compte" >OK</ion-button',
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
  }


  ngOnInit() {
  }

  public validationUser() {
    let _this = this;
    if (this.password === this.passwordVerif) {
      var requete = new XMLHttpRequest();
      requete.onreadystatechange = function () {
        if (this.readyState == 4) {

          let jsondata = JSON.parse(requete.responseText);
          console.log(jsondata);
          if (jsondata === "entrée ajouté en base de données") {
            _this.compteCreeAlert();
          }
        }
      };
      requete.open('POST', 'http://localhost/ionicTAG/Controler/utilisationBDD.php', true);
      requete.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      requete.send("fonctionnalite=ajoute un utilisateur&mail=" + this.email + "&password=" + this.password + "&bloque=0");
    }
    else {
      this.presentAlert();
    }
  }
}


