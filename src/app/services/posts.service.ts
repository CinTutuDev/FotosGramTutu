import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPosts, Post } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  paginasgPosts = 0;

  nuevoPost = new EventEmitter<Post>();

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  getPosts(pull: boolean = false) {
    if (pull) {
      this.paginasgPosts = 0;
    }

    //sumar el uno las
    this.paginasgPosts++;

    return this.http.get<RespuestaPosts>(
      `${URL}/posts/?pg=${this.paginasgPosts}`
    );
  }

  /*Se hace para Post 2 ---> \src\app\pages\tab2\tab2.page.html */

  crearPost(post: any) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token!,
    });
    return new Promise((resolve) => {
      this.http
        .post(`${URL}/posts`, post, { headers })
        .subscribe((resp: any) => {
          this.nuevoPost.emit(resp['post']);
          resolve(true);
        });
    });
  }
}
