import { Usuario } from './../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  /* private para evitar ser leido e fuera */
  user: Usuario = {};

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {

    this.user = this.usuarioService.getUusario();
    console.log(this.user);
  }

  logout() {}
}
