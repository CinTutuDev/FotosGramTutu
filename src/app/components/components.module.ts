import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelecComponent } from './avatar-selec/avatar-selec.component';
import { MapaComponent } from './mapa/mapa.component';

@NgModule({
  declarations: [PostComponent, PostsComponent, AvatarSelecComponent, MapaComponent],
  exports: [PostsComponent, AvatarSelecComponent],
  imports: [CommonModule, IonicModule, PipesModule],
})
export class ComponentsModule {}
