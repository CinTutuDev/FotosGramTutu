 # <p align="center"> ![150px](https://user-images.githubusercontent.com/71487857/223967883-f382f0f3-e3cf-49c8-a99e-3484fac81a52.png)  App para IOS, Android, Chrome.</p> 
 # <p align="center"> Proyecto realizado con ![angular](https://user-images.githubusercontent.com/71487857/212993270-3cf1454e-f0d7-4164-bc01-20d5fe6469cd.png)Angular/![descarga](https://user-images.githubusercontent.com/71487857/212993697-6234ef26-0e4a-40ce-bc8a-a9bfa858a74b.png)Ionic</p> 
 
<img src="https://readme-typing-svg.demolab.com?font=Libre+Baskerville&size=40&duration=3100&pause=500&color=ff3d5c&center=true&vCenter=true&width=940&lines=FotosGramTutu" align="middle" alt="fotosgram" width="100%"/>
 

## Creo el proyecto con tabs:

```
ionic start FotosgramTutu tabs
```
```
 Framework: Angular
 ```
 ```
 ? Create free Ionic account? No
 ```
* Generar paginas pero saber antes que se va a instalar 
```
	ionic g page pages/login --dry-run
	(✔ver antes sin el archivo de prueba: )
	ionic g page pages/login --dry-run --spec=false
	(✔para descargar los modulos: 'si archivo de prueba' )
	ionic g page pages/login --spec=false
```
## 🏍 Levantar app
```
ionic serve
```
## 🎮 Levantar mis servicios backend URL GitHub 
 * URl
```
https://github.com/CinTutuDev/BackendFotogramServe
```
* Clone 
```
https://github.com/CinTutuDev/BackendFotogramServe.git
```

* Terminal 1ºLevantamos BD dentro del proyecto (\ionic\FotosgramTutu> mongod)
```
mongod
```
* Terminal 2º Vamos al backend/server (ionic\BackendFotogramServe>)
<br>
  ❗❗Si no tenemos la carpeta dist ejecutamos el comando:
  
  ```
  tsc
  ```
   Nos creará el directorio dist/ qie es el producto de nuestra app. Y levantamos back :
```
nodemon dist/
      ó
node dist/
```
* 3º Ir a Postman y hacer una petición para confirmar que todo va bien:
![comprobacionPost](https://user-images.githubusercontent.com/71487857/223683037-eae52992-e01d-4abf-913b-a4053b2c100f.png)

## 🕹 En resumen para trabajar el la app:
```
ionic serve
```
```
mongod
```
```
nodemon dist
```
## 📌 Creo servicio para traerme todos los Posts que entran en Bakend 
* Pruebo petición en Posman:

![PeticionGETServer](https://user-images.githubusercontent.com/71487857/223685657-4d394899-38ff-452d-802b-107b1b548a01.png)
* Creo el servicio
```
ionic g s services/posts --skip-tests
```
* Import de http (src\app\app.module.ts)
```
import { HttpClientModule }  from '@angular/common/http'
@NgModule({
  imports: [HttpClientModule],
})
```
* Ir al servicio (src\app\services\posts.service.ts)👀Mirar que es httpClient 
```
import { HttpClient } from '@angular/common/http';
onstructor(private http: HttpClient) { }
```
## 📌🎈❗❗ Si sale este error

* 'Access-Control-Allow-Origin'
* Ir a backend (D:\ionic\BackendFotogramServe\index.ts) y poner este trozo de cod:
```
server.app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
```
* Otra solucion:
```
-Hacer npm install del cors
-Hacer tsc para transpilar
-Levantar app
import  cors  from "cors";
server.app.use(cors({origin:true, credentials: true}));
```
* Luego hacer en terminal dentro del back para transpilar en el dist/ todo (\ionic\BackendFotogramServe> ):
```
tsc
```
* Volver a lentar todo

## 📌 Para crear JSON:
* 1º Ir al Postaman y hacer peticion GET de pg y copiar toda la respuesta del body
![PeticionGETServer](https://user-images.githubusercontent.com/71487857/223685657-4d394899-38ff-452d-802b-107b1b548a01.png)
* 2º copiar del body: ctrl +a +c
```
 {
    "ok": true,
    "pg": 1,
    "posts": [
        {
            "_id": "640879e8d5a
            ...
```
* 3º Ir al visualcode crear interface (interface.ts) 
```
Ctrl +  shift  + v 
Enter
```
Y nos crea la interfaces <br>
Nota❗👀 tenemos que tener extensión JSON to TS

## 📌 Crear modulo  ionic g m components
 ```
 ionic g m components
```
* Creo componente dentro de la carpeta components
```
ionic g c components/posts --spec=false
```
* Para importarlos y exportarlos en (src\app\components\components.module.ts):
```
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [PostComponent, PostsComponent],
  exports: [PostsComponent],
  imports: [CommonModule, IonicModule],
})
```  
* Para usarlo ...ej(\src\app\pages\tab1\tab1.module.ts)
``` 
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    ComponentsModule
  ],
```
## 📌 Crear modulo pipes
```
ionic g m pipes
```
* Para crear dentro de pipes un pipe
```
 ionic g pipe pipes/domSanitazer
```
* Su uso
 * En (src\app\pipes\dom-sanitazer.pipe.ts):
 ```
  import { DomSanitizer } from '@angular/platform-browser';
  constructor(private domSanitazer: DomSanitizer){}
  transform( img: string ): any{
    const domImg = `background-image: url('${img}')`;
    return this.domSanitazer.bypassSecurityTrustStyle( domImg );
  }
 ```
 * Luego en (src\app\pipes\pipes.module.ts) tenemos que exportarlo
  ```
  import { DomSanitazerPipe } from './dom-sanitazer.pipe';
@NgModule({
  declarations: [DomSanitazerPipe],
  exports: [DomSanitazerPipe],
})
```
 * Y luego importarlo en (src\app\components\components.module.ts) para su uso en cualquier componente
   ```
   import { PipesModule } from '../pipes/pipes.module';
   imports: [CommonModule, IonicModule, PipesModule],
   ```

## 📌 Crear guard 
* Se crea principalmente para proteger las rutas
```
 ionic g guard guards/usuario --skip-tests
 ? Which type of guard would you like to create? CanActivate
```
   

## Css para slides aporte del curso de Frenando Herrera súper útil

* En el css (src\app\components\post\post.component.scss)
```
.post {
 margin-top: 10px;
 
 -webkit-box-shadow: 0 2px 10px -5px rgba(0,0,0,0.5);
 box-shadow: 0 2px 10px -5px rgba(0,0,0,0.5);
}

.image-slide {
 width: 100%;
 height: 250px;

 // background-color: red;

 /* Full height */
 // height: 100%; 

 /* Imagen centrada y colocada de forma elegante */
 background-position: center;
 background-repeat: no-repeat;
 background-size: cover;
}
```
* En el html (src\app\components\post\post.component.html)
```
<ion-slides mode="ios" pager="ios" scrollbar="ios" pager="true">
    <ion-slide class="image-slide">
      <ion-img src="assets/1.png"></ion-img>
    </ion-slide>
  </ion-slides>
```

## ![descarga](https://user-images.githubusercontent.com/71487857/214578135-16d1a768-8961-4099-82ce-43045983b5f6.png)@ionic/storage

```
*Dar funcionalidad al btn de favoritos guardando y mostrando con storage

 URL
 https://github.com/ionic-team/ionic-storage

 *Instalación
 npm install @ionic/storage

 *Instalar biblioteca Angular
 npm install @ionic/storage-angular

 *Como es un módulo va en los imports:
 import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    IonicStorageModule.forRoot(),
    OJO ❗❗ si sale error reiniciar code❗❗ 
  ]
})
export class AppModule { }

*Creo un servicio:

 inic g s services/usuario --skip-tests

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

constructor(private http: HttpClient, private storage: Storage) { 
 OJO ❗❗  declarar el token:
  token: string | null = null;
}

*Inyectamos el servicio
src\app\components\detalle-peli\detalle-peli.component.ts

import { StorageService } from './../../services/storage.service';
 favoritos() {
    this.storageServide.getGuardoPeli(this.peli)
  }
```
## 🌍 Geo localización
### URL 
```
https://ionicframework.com/docs/native/geolocation
```
* Istalación
```
npm install cordova-plugin-geolocation
npm install @awesome-cordova-plugins/geolocation
npx cap sync
```
* Ir a \app\app.module.ts
```
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
providers: [Geolocation,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
❗❗ si sale error solo hay que reiniciar en VC
```
* Codigo
```
this.geoLocation.getCurrentPosition().then((resp)=>{

      this.cargandoGeo = false;

    }).catch((error)=>{
      console.log('Error de coger localización', error);
      this.cargandoGeo = false;

    })
```
* Añadir al config.xml

```
URL
https://github.com/apache/cordova-plugin-geolocation

```
```
Codigo
<edit-config target="NSLocationWhenInUseUsageDescription" file="*-Info.plist" mode="merge">
    <string>Necesito tu autoricación para saber tu ubicación</string>
</edit-config>
```

## 🗺 Map --> account.mapbox.com/

* Registrarse
* Luego ir a (https://docs.mapbox.com/mapbox-gl-js/guides/install/) y copiar el CDN y pegarlo en index.html antes del cierre del </head>:
 ```
 <script src='https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js'></script>
<link href='https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css' rel='stylesheet' />
```
## 📸 Cámara de fotos
* Lo realizo con Capacitor.
* 1.- Instalar Capacitor en un proyecto ya existente: usando la consola siempre dentro de la carpeta principal de tu proyecto ( la misma carpeta desde la que normalmente ejecutas ionic serve para lanzar la app ), ejecuta el comando:
 <br>
```
ionic integrations enable capacitor
```
eso es un script que instala automaticamente @capacitor/core, @capacitor/cli, y hace el 'capacitor init' con los datos que de tu aplicacion si los encuentra.
<br>

* 2.- Inicializar Capacitor: aunque el paso anterior debe detectar el nombre y el ID de tu app y hacer el 'init' los tutoriales recomiendan este paso ( ej: en mi caso el nombre de la app detectado automatico en paso 1 no coincidia con el del xml ):
 <br>
✔ 2.1 Busca el id y name de tu app en el archivo config.xml en la carpeta raiz del proyecto, los datos estan al inicio y en mi caso decia esto, si no tocaste el tuyo probablemente sea igual:
```
<widget id="io.ionic.starter" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>MyApp</name>
 ```
 <br>
✔ 2.2 ejecuta el comando de inicializacion:
```
npx cap init MyApp io.ionic.starter
```
responde Yes al mensaje:
<br>

? capacitor.config.json already contains cordova preferences. Overwrite with values from config.xml? Yes
<br>
* 3.-Ionic build : Debes tener al menos 1 build hecho, en nuestro caso del curso hemos hecho ya muchos para probar la app, pero para estar seguro de que exista la capteta www en la raiz del proyecto ( capacitor la requiere ) ejecuta:
```
ionic build
```
* 4.- Añadir Plataformas: Cordova maneja las plataformas dentro de la carpeta 'platforms' pero Capacitor usa una estructura de carpetas directamente a la raiz del proyecto, creando una para android , otra para ios y una tercera para los recursos: resources.
para añadir las plataformas ( ambas o solo una si deseas ):<br>
```
npx cap add android
npx cap add ios
```
<br>
Nota❗: Capacitor migra automaticamente las dependencias de cordova y plugins que sean compatibles con el , pero no quites las de cordova hasta que estes seguro de lo que haces ( no te afecta para estas pruebas que se queden ahi ),
<br>
* 5.- Lanzar los IDE android o iOS : En este punto ya puedes hacer pruebas en dispositivos fisicos y emuladores, o saltar al punto 6 para implementar el plugin de la camara en capacitor.

Para abrir las IDE desde la linea de comando puedes uno de estos segun sea el caso, o abrir la carpeta correspondiente ( android o ios desde la IDE ):
<br>
```
npx cap open android
npx cap open ios 
```
* 6.- Usar plugin Capacitor para la camara (D:\ionic\FotosgramTutu\src\app\pages\tab2\tab2.page.ts)
 ```
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
  tempImages: string[] = [];
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
```
* En D:\ionic\FotosgramTutu\src\main.ts
```
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);
```

## 🐛 Android Errores

```
 *Necesitamos cambiar las dependecias
	  -Este es el error que sale: 

"Caused by: org.gradle.internal.metaobject.AbstractDynamicObject$CustomMessageMissingMethodException: Could not find method compile() for arguments [{name=barcodescanner-release-2.1.5, ext=aar}] on object of type org.gradle.api.internal.artifacts.dsl.dependencies.DefaultDependencyHandler."
 
🔨SOLUCIÓN

	Cambiar las dependencias de "compile" a "implementation"

	-File-->ProyectStructure-->Dependencias->"Las que estan subrayadas"-->Cambiar en "configuration" : compile -> implemention

```
* Si saliera este error:
```
"Android 10 doesn't support "whitelist plugin", when I add android platform it skips whitelist plugin which cause "file transfer plugin" issues when building or running the application" 
En esta URL se soluciona:
https://stackoverflow.com/questions/68896148/android-10-doesnt-support-whitelist-plugin

* Instalacion:
 npm i https://github.com/apache/cordova-plugin-file-transfer.git 
 to install plugin and then:
 npm install @awesome-cordova-plugins/file-transfer
 then
 ionic cap sync 

I needed this line in my config.xml as well
<preference name="AndroidInsecureFileModeEnabled" value="true" />

```



