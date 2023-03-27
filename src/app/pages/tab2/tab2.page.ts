/* import { UserPhoto } from './../../services/posts.service'; */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import {
  ActionSheetController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { Platform } from '@ionic/angular';
import {
  Camera,
  CameraResultType,
  GalleryImageOptions,
  CameraSource,
  Photo,
  GalleryPhoto,
} from '@capacitor/camera';
import { Capacitor, Plugins } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from '../../services/usuario.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// Manejo de errores
import { throwError, catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
 /*  tempImages: string[] | any = []; */
  tempImages: SafeResourceUrl[] = [];
  private platform: Platform;
  imageSanitizerRequired = false;
  loading: any; // indicador progreso de carga de imagen
   URL : any = environment.url;
  /* cameraImage: any; */
  cargandoGeo = false;
  post = {
    mensaje: '',
    coords: null as string | null, // se añade "as string | null" para permitir valores de tipo `string` y `null`
    posicion: false,
  };

  constructor(
    private sanitizer: DomSanitizer,
    public postService: PostsService,
    private route: Router,
    private geoLocation: Geolocation,
    public actionSheetController: ActionSheetController,
    private usuarioService: UsuarioService,
    private http: HttpClient,
    platform: Platform,
    private loader: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.platform = platform;

    if (this.platform.is('ios')) {
      this.imageSanitizerRequired = true;
    }
  }

  async crearPost() {
    console.log('este es el post de tab2',this.post);                  
    this.postService.crearPost(this.post);
    console.log(this.post);
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

  /* --------------------------------------------------Servicio de camara-------------------------------------------- */

  async camara() {
    // configurar opciones
    const options = {
      quality: 60,
      allowEditing: false,
      correctOrientation: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    };
    // obtener foto: puede ser un metodo aparte

    try {
      const image = await Camera.getPhoto(options);
      // sanitizar la url de la imagen
      const img = this.sanitizer.bypassSecurityTrustResourceUrl(
        image && image.webPath!
      );
      // empujar la imagena nuestro array temporal
      this.tempImages.push(img);
      // llamar a servicio que sube la imagen al servidor
      this.subirImagenHttp(image.webPath!);
    } catch (err) {
      // capturar error e indicarlo
      console.error(err);
    }
    this.procesarImagen(CameraSource.Camera);
  }

  // captura la imagen en el dispositivo
  async procesarImagen(source: CameraSource) {
    // configurar opciones
    const options = {
      quality: 80,
      allowEditing: false,
      correctOrientation: true,
      resultType: CameraResultType.Uri,
      source, // recibida como parametro
    };
    // obtener la foto en 'image'
    try {
      const image = await Camera.getPhoto(options);
      // sanitizar la url de la imagen
      const img = this.sanitizer.bypassSecurityTrustResourceUrl(
        image && image.webPath!
      );
      // empujar la imagena nuestro array temporal
      this.tempImages.push(img);
      // llamar a servicio que sube la imagen al servidor
      this.subirImagenHttp(image.webPath!);
    } catch (err) {
      // capturar error e indicarlo
      console.error(err);
    }
  }

  // metodo para tomar foto usando capacitor
  async libreria() {
    // configurar opciones
    const options = {
      quality: 60,
      allowEditing: false,
      correctOrientation: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    };
    // obtener foto: puede ser un metodo aparte
    try {
      const image = await Camera.getPhoto(options); // sanitizar la url de la imagen
      const img = this.sanitizer.bypassSecurityTrustResourceUrl(
        image && image.webPath!
      );
    
      console.log('image', image);
      console.log('img', img);
      // llamar a servicio que sube la imagen al servidor
      this.subirImagenXHR(image.webPath!);
        // empujar la imagena nuestro array temporal
        this.tempImages.push(img);
    } catch (err) {
      // capturar error e indicarlo
      console.error(err);
    }
    this.procesarImagen(CameraSource.Photos);
  }

  
  // usar XHR para cargar fotos al backend
  async subirImagenXHR(webPath: string) {
    // convertir webPath a Blob

    const blob = await fetch(webPath).then((resp) => resp.blob());
    // preparar formulario con archivo como datos
    const formData = new FormData();
    formData.append('image', blob, );
    // abrir la peticion
    const xhr = new XMLHttpRequest();
    
    xhr.open('POST', `${URL}/posts/upload`);
    // configurar headers con token
    xhr.setRequestHeader('x-token', this.usuarioService.token!);
    // funcion para tomar acciones cuando se complete la peticion
    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
          // implementar aca lo que se desee al completar la peticion
          console.log('Imagen subida correctamente');
        } else {
          console.error('Error al subir la imagen');
        }
      }
    };
    // progreso del upload
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const porcientoSubido = (e.loaded / e.total) * 100;
        console.log(porcientoSubido + '% Subido');
      }
    };
    // enviar archivo
    xhr.send(formData);
  }

  
  async subirImagenHttp(webPath: string) {
    // convertir webPath a Blob
    const blob = await fetch(webPath).then(resp => resp.blob());
    // preparar headers con token
    const headers = new HttpHeaders ({
      'x-token': this.usuarioService.token!
    });
    // preparar FormData para envio http a servidor
    const formData = new FormData();
    formData.append('image', blob, `image.jpg`);
    // peticion post http al endpoint en servidor
    this.ShowFormData(formData) 
    this.http.post<boolean>(`${ URL }/posts/upload`, formData, { headers })
   
   
      // manejar errores y resultado
      .pipe(
        catchError(e => this.handleError(e)), // implementar ese metodo aparte
        finalize(() => console.log('Carga completada'))
      )
      .subscribe(ok => {
        if (ok){
           console.log('Imagen subida correctamente');
        } else {
          console.error('Error al subir la imagen');
        }
      });
  }
  ShowFormData(formData: FormData) {
    throw new Error('Method not implemented.');
  }
/*   crearPost(post: any) {
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
 */



  // manejo de errores
  private handleError(error: any) {
    const errMsg = error.message ? error.message : error.toString();
    return throwError(errMsg);
  }

  // informar al usuario con Toast
  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'top',
    });
    toast.present();
  }
  /* -------------------------------------------------camara------------------------------------ */

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
          /*  handler: () => {
            this.deletePicture(photo, position);
          }, */
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
}
export interface UserPhoto {
  data: string;
  filepath: string;
  webviewPath: string;
  saved: boolean;
  name: string;
}
