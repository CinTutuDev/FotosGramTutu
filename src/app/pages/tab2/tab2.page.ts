import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService, UserPhoto } from '../../services/posts.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { ActionSheetController } from '@ionic/angular';

declare let window: any;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  tempImages: string[] | any= [];
  tempImages2: string[] | any= [];
  /* cameraImage: any; */
  cargandoGeo = false;
  post = {
    mensaje: '',
    coords: null as string | null, // se añade "as string | null" para permitir valores de tipo `string` y `null`
    posicion: false,
  };

  constructor(
    public postService: PostsService,
    private route: Router,
    private geoLocation: Geolocation,
    public actionSheetController: ActionSheetController
    /* private camera: Camera, private platform: Platform */
  ) { this.tempImages = this.tempImages2 }

  async crearPost() {
    console.log(this.post);
    const creado = await this.postService.crearPost(this.post);

    this.post = {
      mensaje: '',
      coords: null,
      posicion: false,
    };
    
    this.tempImages = [];

    this.route.navigateByUrl('/main/tabs/tab1');
  }

  getGeo() {
    /* si es false no ponemos posicion  */
    if (!this.post.posicion) {
      this.post.coords = null;
      return;
    }

    this.cargandoGeo = true;

    this.geoLocation
      .getCurrentPosition()
      .then((resp: any) => {
        this.cargandoGeo = false;
        const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
        console.log(coords);
        this.post.coords = coords; // se asigna el valor de tipo `string` a la propiedad `coords`
      })
      .catch((error) => {
        console.log('Error al obtener la ubicación', error);
        this.cargandoGeo = false;
        this.post.coords = null;
      });
    /*  console.log(this.post); */
  }

  /* -------------------------------------------------camara------------------------------------ */

 
  addPhotoToGallery() {
    this.postService.addNewToGallery();
  }
  public async showActionSheet(photo: UserPhoto, position: number) {
    /* Metodo para opiones de galeria(al thacer click en la foto muestra: ) */
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.postService.deletePicture(photo, position);
          },
        },

        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // Nothing to do, action sheet is automatically closed
          },
        },
        {
          text: 'Share',
          icon: 'share-social-sharp',
          data: {
            action: 'share',
          },
        },

      ],
    });
    await actionSheet.present();
  }
  async ngOnInit() {
    await this.postService.loadSaved();
  }
}
