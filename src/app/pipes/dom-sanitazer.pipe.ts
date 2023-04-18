import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitazer',
})
export class DomSanitizerPipe implements PipeTransform {

  constructor( private domSanitizer: DomSanitizer ) {}
  
  transform(img: any): any {
    const domImg = `background-image: url(${ img })`;
/*     const domImg = `url(${ img })`; */
    return this.domSanitizer.bypassSecurityTrustStyle(domImg);
 /*    return  this.domSanitizer.bypassSecurityTrustUrl( img ) ; */
  }
 

}
