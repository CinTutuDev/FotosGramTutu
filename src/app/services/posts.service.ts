import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPosts, Post } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { Platform } from '@ionic/angular';
/* import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx'; */
/* import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { Filesystem, Directory } from '@capacitor/filesystem'; */
const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
 /*  public photos: UserPhoto[] | any = [];
  private PHOTO_STORAGE: string | any = 'photos';
  private platform: Platform;
 */
  paginasgPosts = 0;

  nuevoPost = new EventEmitter<Post>();

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    platform: Platform
  ) {
    /* this.platform = platform; */
  }

  getPosts(pull: boolean = false) {
    if (pull) {
      this.paginasgPosts = 0;
    }

    //sumar el uno las
    this.paginasgPosts++;

    return this.http.get<RespuestaPosts>(
      `${URL}/posts/?pg=${this.paginasgPosts}`
    );
  }

  /*Se hace para Post 2 ---> \src\app\pages\tab2\tab2.page.html */

  crearPost(post: any) {
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

  
/* --------------------------------------------------Servicio de camara-------------------------------------------- */
/*  subirImagen( img: string ) {

  const options: FileUploadOptions = {
    fileKey: 'image',
    headers: {
      'x-token': this.usuarioService.token
    }
  };

  const fileTransfer: FileTransferObject = this.fileTransfer.create();

  fileTransfer.upload( img, `${ URL }/posts/upload`, options )
    .then( data => {
      console.log(data);
    }).catch( err => {
      console.log('error en carga', err);
    });

}  */
/*   public async camara() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    // Save the picture and add it to photo collection
    const savedImageFile = await this.guardarFoto(capturedPhoto);
    this.photos.unshift(savedImageFile);

    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
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

  public async loadSaved() {
    // Retrieve cached photo array data
    const photoList = await Preferences.get({ key: this.PHOTO_STORAGE });
    this.photos = JSON.parse(photoList.value ?? '[]');

    if (!this.platform.is('hybrid')) {
      // Display the photo by reading into base64 format
      for (let photo of this.photos) {
        // Read each saved photo's data from the Filesystem
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data,
        });

        // Web platform only: Load the photo as base64 data
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }
  public async deletePicture(photo: UserPhoto, position: number) {
    // Remove this photo from the Photos reference data array
    this.photos.splice(position, 1);

    // Update photos array cache by overwriting the existing photo array
    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
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
    export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}
 */
}
