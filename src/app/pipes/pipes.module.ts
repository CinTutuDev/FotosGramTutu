import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitazer.pipe';
import { ImageSanitizerPipe } from './image-sanatizer.pipe';
import { ImagenPipe } from './imagen.pipe';

@NgModule({
  declarations: [DomSanitizerPipe, ImageSanitizerPipe, ImagenPipe],
  exports: [DomSanitizerPipe, ImageSanitizerPipe, ImagenPipe],
})
export class PipesModule {}
