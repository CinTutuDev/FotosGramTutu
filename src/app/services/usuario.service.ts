import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
/* import { resolve } from 'dns'; */
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private _storage: Storage | null = null;
  /* token = null; */
  /*  token  = null */
  /*   token: string | null = null; */
  token = null;
  /* private para evitar ser leido e fuera */
  private usuario: Usuario = {};

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController
  ) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  /* ------------------------------------------------------LOGIN-------------------------------------- */
  login(email: string, password: string) /* : any */ {
    const data = { email, password };

    return new Promise((resolve) => {
      this.http.post(`${URL}/user/login`, data).subscribe((resp: any) => {
        console.log(resp);

        if (resp['ok']) {
          this.guardarToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }
  /* --------------------------------------------------------NUEVO USER----------------------------------------------- */
  /* eL  Usuario es --> export interface Usuario {
  _id?: string;
  nombre?: string;
  avatar?: string;
  email?: string;
  password?: string;

}
*/
  registro(user: Usuario) {
    return new Promise((resolve) => {
      this.http.post(`${URL}/user/create`, user).subscribe((resp: any) => {
        console.log(resp);

        if (resp['ok']) {
          this.guardarToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  getUusario() {
    if (!this.usuario) {
      this.validaToken();
    }

    return { ...this.usuario };
  }

  async guardarToken(token: any) {
    this.token = token;
    await this.storage.set('token', token);
  }

  async cargarToken() {
    this.token = (await this.storage.get('token')) || null;
  }

  async validaToken(): Promise<boolean> {
    await this.cargarToken();
    /* Si no existe token lo sacamos del storage ...resolvemos un falso lo sacamos
    lo mandamos al login  */
    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>((resolve) => {
      const headers = new HttpHeaders({
        'x-token': this.token!,
      });
      

      this.http.get(`${URL}/user/`, { headers }).subscribe((resp: any) => {
        if (resp['ok']) {
          this.usuario = resp['usuario'];
          resolve(true);
        } else {
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }
      });
    });
  }

  /* -----------------------------------------------------ACTUALIZAR USER-------------------------------------------- */

  actulizarUser(user: Usuario) {
    const headers = new HttpHeaders({
      'x-token': this.token!,
    });

    console.log('user', user);

    return new Promise<boolean>((resolve) => {
      this.http
        .post(`${URL}/user/update`, user, { headers })
        .subscribe((resp: any) => {

          console.log(resp);

          if (resp['ok']) {
            this.guardarToken(resp['token']);
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }
}
