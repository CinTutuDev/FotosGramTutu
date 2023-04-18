import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { Usuario } from '../../interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides | any;

  loginUsuario = {
    email: 'test1@test.com',
    password: '123',
  };

  registerUser: Usuario = {
    email: 'test',
    password: '123',
    nombre: 'Test',
    avatar: 'av-1.png',
  };

  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiServiceService
  ) {}

  ngOnInit() {
    this.slides?.lockSwipes(true);
  }

  async loginUser(fLogin: NgForm) {
    if (fLogin.invalid) {
      return;
    }

    const valido = await this.usuarioService.login(
      this.loginUsuario.email,
      this.loginUsuario.password
    );

    /* Si es valido el login ves a esta ruta ...main */
    /*  */
    if (valido) {
      // navegar al tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      // mostrar alerta de usuario y contraseña no correctos
      this.uiService.alertInfo('Usuario y contraseña no son correctos.');
    }
  }

  async crearUser(fCrear: NgForm) {
    if (fCrear.invalid) {
      return;
    }

    const valido = await this.usuarioService.registro(this.registerUser);
    /*  console.log(fCrear.valid); */
    if (valido) {
      // navegar al tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      // mostrar alerta de usuario y contraseña no correctos
      this.uiService.alertInfo('El correo electrónico ya existe');
    }
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }
}
