import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  /*  private _storage: Storage | null = null; */
  /* token = null; */
  /*  token  = null */
  token: string | null = null;
  constructor(private http: HttpClient, private _storage: Storage) {
    this._storage.create();
  }

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
          this._storage.clear();
          resolve(false);
        }
      });
    });
  }

  async guardarToken(token: string) {
    this.token = token;
    await this._storage.set('token', token);
  }
}
