import { Post } from './../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  //ALmacenar los post
  posts: Post[] | any = [];

  habilitado = true;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.siguiente();
    /*     throw new Error('Method not implemented.'); */
  }

  recargar(event?: any) {
    this.siguiente(event, true);
    this.habilitado = true;
      this.posts = [];
  }

  siguiente(event?: any, pull: boolean = false) {
    this.postsService.getPosts(pull).subscribe((resp) => {
      console.log(resp);
      this.posts.push(...resp.posts);

      if (event) {
        event.target.complete();
        if (resp.posts.length === 0) {
          this.habilitado = false;
        }
      }
    });
  }
}
