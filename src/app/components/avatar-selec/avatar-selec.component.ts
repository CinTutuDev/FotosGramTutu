import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-avatar-selec',
  templateUrl: './avatar-selec.component.html',
  styleUrls: ['./avatar-selec.component.scss'],
})
export class AvatarSelecComponent implements OnInit {
  @Output() avatarActualChange  = new EventEmitter<string>();

  @Input() avatarActual: string | undefined;
  avatares = [
    {
      img: 'av-1.png',
      seleccionado: true,
    },
    {
      img: 'av-2.png',
      seleccionado: false,
    },
    {
      img: 'av-3.png',
      seleccionado: false,
    },
    {
      img: 'av-4.png',
      seleccionado: false,
    },
    {
      img: 'av-5.png',
      seleccionado: false,
    },
    {
      img: 'av-6.png',
      seleccionado: false,
    },
    {
      img: 'av-7.png',
      seleccionado: false,
    },
    {
      img: 'av-8.png',
      seleccionado: false,
    },
    {
      img: 'av-9.png',
      seleccionado: false,
    },
    {
      img: 'av-10.png',
      seleccionado: false,
    },
    {
      img: 'av-11.png',
      seleccionado: false,
    },
    {
      img: 'av-12.png',
      seleccionado: false,
    },
  ];

  avatarSlide = {
    slidesPerView: 3.5,
  };

  constructor(private userService:UsuarioService ) {}

  async ngOnInit() {
    this.avatarActual = (await this.userService.getUusario()).avatar;
    this.avatares.forEach(avatar => avatar.seleccionado = false);
    for (const avatar of this.avatares) {
      if (avatar.img === this.avatarActual) {
        avatar.seleccionado = true;
        break;
      }
    }
  }

  seleccionarAvatar(avatar: any) {
    this.avatares.forEach((av) => (av.seleccionado = false));

    avatar.seleccionado = true;
    console.log(avatar.img);
    this.avatarActual = avatar.img;
    this.avatarActualChange.emit(this.avatarActual);
  }
}
