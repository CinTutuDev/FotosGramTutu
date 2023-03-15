import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  tempImages: string[] = [];

  post = {
    mansaje: '',
    coords: null,
    posicion: false,
  };

  constructor() {}

  crearPost() {

    console.log(this.post);
  }
}
