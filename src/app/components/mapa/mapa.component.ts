import { Component, Input, OnInit, ViewChild } from '@angular/core';
declare let mapboxgl: any;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  @Input() coords: string | undefined;
  @ViewChild('mapa', { static: true }) mapa: any;
  constructor() {}

  ngOnInit() {
    if (!this.coords) {
      console.error('Las coordenadas no están definidas');
      return;
    }
    const latLong = this.coords.split(',');
    if (latLong.length !== 2) {
      console.error('El formato de las coordenadas no es correcto');
      return;
    }
    const lat = parseFloat(latLong[0]);
    const long = parseFloat(latLong[1]);
    if (isNaN(lat) || isNaN(long)) {
      console.error('Las coordenadas no se pueden convertir a números');
      return;
    }
    mapboxgl.accessToken =
      'pk.eyJ1IjoiY2ludGF0YyIsImEiOiJjbGZjOXVzMnAwbXhmM3huMTc3cnd2cG5rIn0.wCsVZJ0fTk5JtliChD0V5Q';
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [long, lat], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });

    /* Creacion de marcador */
    const marker = new mapboxgl.Marker().setLngLat([long, lat]).addTo(map);
  }
}
