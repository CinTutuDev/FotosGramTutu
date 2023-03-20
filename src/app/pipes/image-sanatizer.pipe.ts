import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'imageSanatizer'
})
export class ImageSanatizerPipe implements PipeTransform {

  constructor( private domSanitizer: DomSanitizer ) { }

  transform(img: string ): any {
    const domImg = `background-image: url('${ img }')`;

    return this.domSanitizer.bypassSecurityTrustStyle( domImg );
  }

}
