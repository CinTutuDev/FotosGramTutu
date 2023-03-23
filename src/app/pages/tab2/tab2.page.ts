/* import { UserPhoto } from './../../services/posts.service'; */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import {
  Camera,
  CameraResultType,
  GalleryImageOptions,
  CameraSource,
  Photo,
  GalleryPhoto,
} from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from '../../services/usuario.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page  {
  tempImages: string[] | any = [];
  private platform: Platform;
  imageSanitizerRequired = false;

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
    public actionSheetController: ActionSheetController,
    private loader: LoadingController,
    private usuarioService: UsuarioService,
    private http: HttpClient,
    

    platform: Platform
    /* private camera: Camera, private platform: Platform */
  ) {
    /*  this.tempImages = this.tempImages2  */
    this.platform = platform;

    if (this.platform.is('ios')) {
      this.imageSanitizerRequired = true;
    }
  }

  async crearPost() {
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
  async procesarImagen(image: Photo) {
    // Write the file to the data directory
    const fileName= new Date().getTime() + '.jpeg';
    const base64Data = await this.readAsBase64(image);

    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    const readFile = await Filesystem.readFile({
      path: fileName,
      directory: Directory.Data
    });

    this.tempImages.unshift({
      filepath: 'soon....',
      webviewPath: image.webPath,
      data:`data:image/jpeg;base64,${readFile.data}`,
      name:'f',
    });
    const imagen: UserPhoto = {
      filepath: base64Data,
      webviewPath: image.webPath!,
      data: `data:image/jpeg;base64,${readFile.data}`,
      name: fileName,
      saved: false
    }
    this.subirImg(imagen)
  }
  async subirImg(file: UserPhoto){
    const response = await fetch(file.data);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('image', blob, file.name);
    this.uploadData(formData);
  }

  private async readAsBase64(photo: Photo) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path!,
      });

      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
    }
  }
  private convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader;
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

    async uploadData(formData: FormData){

      const loading = await this.loader.create({
        message: 'cargando imagen...'
      });
      await loading.present();
      const URL = environment.url;
      const url = `${URL}/post/upload`;
      const headers = new HttpHeaders({
      'x-token': this.usuarioService.token!
      })
      this.http.post(url, formData, {headers}).pipe(finalize(()=>{
        loading.dismiss();
      })).subscribe((res:any)=>{
        if(res['success']){
          this.subirImagen('file upload complete');
        }
      })
    }

  subirImagen( img: string ) {

 /*  const options: FileUploadOptions = {
    fileKey: 'image',
    headers: {
      'x-token': this.usuarioService.token
    }
  }; */
/*   const fileTransfer= Filesystem.appendFile()


  fileTransfer.upload( img, `${ URL }/posts/upload`, options )
    .then( (data: any) => {
      console.log(data);
    }).catch( (er:any) => {
      console.log('error en carga', er);
    });
 */
}



  async camara() {
    // Take a photo
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    /* this.tempImages.unshift({
      filepath: 'soon....',
      webviewPath: image.webPath,
    }); */
    this.procesarImagen(image)
  }

 async libreria() { // Take a photo
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    /* this.tempImages.unshift({
      filepath: 'soon....',
      webviewPath: image.webPath,
    }); */
    this.procesarImagen(image)}


    
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
