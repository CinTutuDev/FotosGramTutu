import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { ActionSheetController } from '@ionic/angular';


import { Platform } from '@ionic/angular';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {

  tempImages: string[] | any= [];
  /* public photos: UserPhoto[] | any = []; */
  private PHOTO_STORAGE: string | any = 'photos';
  private platform: Platform;

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
    platform: Platform
    /* private camera: Camera, private platform: Platform */
  ) {/*  this.tempImages = this.tempImages2  */this.platform = platform;}

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
  public async camara() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    // Save the picture and add it to photo collection
    const image = await this.guardarFoto(capturedPhoto);
    console.log(image);
    this.tempImages.unshift(image);

    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.tempImages),
    });
  }

  private async guardarFoto(photo: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    if (this.platform.is('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: photo.webPath,
      };
    }
  }

  public async cargarGuardado() {
    // Retrieve cached photo array data
    const photoList = await Preferences.get({ key: this.PHOTO_STORAGE });
    this.tempImages = JSON.parse(photoList.value ?? '[]');

    if (!this.platform.is('hybrid')) {
      // Display the photo by reading into base64 format
      for (let photo of this.tempImages) {
        // Read each saved photo's data from the Filesystem
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data,
        });

        // Web platform only: Load the photo as base64 data
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      /*   const  any = photo.webviewPath */
      }
    }
  }
  public async deletePicture(photo: UserPhoto, position: number) {
    // Remove this photo from the Photos reference data array
    this.tempImages.splice(position, 1);

    // Update photos array cache by overwriting the existing photo array
    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.tempImages),
    });

    // delete photo file from filesystem
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);

    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data,
    });
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
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });




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
          handler: () => {
            this.deletePicture(photo, position);
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
    await this.cargarGuardado();
  }
}
 export interface UserPhoto {
  filepath: string;
  webviewPath: string;
} 