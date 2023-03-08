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
  posts : Post [] | any = [];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    /*     throw new Error('Method not implemented.'); */

    this.postsService.getPosts().subscribe((resp) => {
      console.log(resp.posts);
      console.log(resp.posts[0].mensaje);
      this.posts.push(...resp.posts)
    });
  }
}
