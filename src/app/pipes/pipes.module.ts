import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitazerPipe } from './dom-sanitazer.pipe';

@NgModule({
  declarations: [DomSanitazerPipe],
  exports: [DomSanitazerPipe],
})
export class PipesModule {}
