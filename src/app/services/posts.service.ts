import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPosts } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  paginasgPosts = 0;

  constructor(private http: HttpClient) {}

  getPosts( pull: boolean = false ) {

    if(pull){
      this.paginasgPosts = 0;
    }

    //sumar el uno las
    this.paginasgPosts++;

    return this.http.get<RespuestaPosts>(`${URL}/posts/?pg=${this.paginasgPosts}`);
  }
}
