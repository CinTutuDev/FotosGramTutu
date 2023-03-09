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

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.siguiente();
    /*     throw new Error('Method not implemented.'); */
  }
  siguiente(event?: any) {
    this.postsService.getPosts().subscribe((resp) => {
      this.posts.push(...resp.posts);

      if (event) {
        event.target.complete();

        if (resp.posts.length === 0) {
          event.target.disabled = true;
        }
      }
    });
  }
}
