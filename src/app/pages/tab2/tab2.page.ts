import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Platform } from '@ionic/angular';

declare let window: any;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  tempImages: string[] = [];
  cameraImage: any;
  cargandoGeo = false;
  post = {
    mensaje: '',
    coords: null as string | null, // se añade "as string | null" para permitir valores de tipo `string` y `null`
    posicion: false,
  };

  constructor(
    private postService: PostsService,
    private route: Router,
    private geoLocation: Geolocation,
    /* private camera: Camera, private platform: Platform */
  ) {}

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
 /*  Opencamara() {
    this.platform.ready().then(() => {
      const options: CameraOptions = {
        quality: 60,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        sourceType: this.camera.PictureSourceType.CAMERA
      };
      this.camera.getPicture(options).then((imageData) => {
        // imageData es una cadena codificada en base64 de la imagen capturada
        this.cameraImage = 'data:image/jpeg;base64,' + imageData;
        // Agregar la imagen a la matriz de imágenes cargadas desde la galería
        this.galleryImages.push(this.cameraImage);
      }, (err) => {
        console.log(err);
      });
    });
  } */
  async Opencamara() {
    const image = await Camera.getPhoto({
        quality: 60,
        allowEditing: false,
        correctOrientation: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
        /*   source: CameraSource.Camera     */
      });
   
      const img = window.Ionic.WebView.convertFileSrc( image);
   
   /*     this.postService.subirImagen( imageData ); */
      this.tempImages.push( img );
    }
  libreria(){}

/*   libreria() {

    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.procesarImagen( options );

  } */

/* 
  procesarImagen( options: CameraOptions ) {

    this.camera.getPicture(options).then( ( imageData ) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):

       const img = window.Ionic.WebView.convertFileSrc( imageData );

       this.postsService.subirImagen( imageData );
      this.tempImages.push( img );

     }, (err) => {
     // Handle error
    });
  }  */
}
