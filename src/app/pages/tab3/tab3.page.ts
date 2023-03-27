import { Usuario } from './../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  /* private para evitar ser leido e fuera en el src\app\services\usuario.service.ts*/
  user: Usuario = {};

  constructor(
    private usuarioService: UsuarioService,
    private uiServide: UiServiceService,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.user = this.usuarioService.getUusario();
    console.log(this.user);
  }

  async actualizar(fActualizar: NgForm) {
    if (fActualizar.invalid) {
      return;
    }

    const actualizado = await this.usuarioService.actulizarUser(this.user);
    if (actualizado) {
      // toast con el mensaje de actualizado
      this.uiServide.presentToast('middle', 'Registro actualizado');
    } else {
      // toast con el error
      this.uiServide.presentToast('middle', 'No se pudo actualizar');
    }
  }

  logout() {
    this.postsService.paginasgPosts = 0;
    this.usuarioService.logout();
  }
}
