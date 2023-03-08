import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  paginasgPosts = 0;

  constructor(private http: HttpClient) {}

  getPosts() {
    //sumar el uno las
    this.paginasgPosts++;

    return this.http.get(`${URL}/posts/?pg=${this.paginasgPosts}`);
  }
}
