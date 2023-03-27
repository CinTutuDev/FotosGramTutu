import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitazer',
})
export class DomSanitizerPipe implements PipeTransform {

  constructor( private domSanitizer: DomSanitizer ) {}
  
  transform(value: any): any {
    /* const domImg = `${URL}/posts/imagen/${userId}/${img}`; */
    
    return this.domSanitizer.bypassSecurityTrustStyle(value);
 /*    return  this.domSanitizer.bypassSecurityTrustUrl( img ) ; */
  }
 

}
