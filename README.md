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
## Creo servicio para traerme todos los Posts que entran en Bakend 
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

## Para crear JSON:
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

## Crear modulo  ionic g m components
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






