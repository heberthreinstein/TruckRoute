import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { LoadingOptions, ToastOptions, AlertOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor(private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) { }


  public async loading(opcoes?: LoadingOptions): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando',
      ...opcoes
    });
    loading.present();
    return loading;
  }

  public async toast(opcoes: ToastOptions): Promise<HTMLIonToastElement> {
    const toast = await this.toastCtrl.create({
      duration: 3000,
      ...opcoes
    });
    toast.present();
    return toast;
  }

  async alert(msg: string, options?: AlertOptions): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create({
      message: msg,
      buttons: [
        {
          text: 'ok'
        }
      ],
      ...options
    });
    await alert.present();
    return alert;
  }
}