import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UiServiceService {
  /* Creo este servicio para centralizar la peticiones de alert.....   */
  /* PAra alertController -->  https://ionicframework.com/docs/v7/api/alert*/

  constructor(private alertController: AlertController) {}

  async alertInfo(message: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      /* subHeader: 'Important message', */
      /*  El mensaje viene desde src\app\pages\login\login.page.ts */
      cssClass: 'alert-button-confirm',
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
