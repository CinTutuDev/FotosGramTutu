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

  loginUsuario = {
    email: 'test1@test.com',
    password: '123',
  };

  registerUser: Usuario = {
    email: 'test',
    password: '123',
    nombre: 'Test',
    avatar: 'av-1.png'
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

  seleccionarAvatar(avatar: any) {
    this.avatares.forEach((av) => (av.seleccionado = false));
    avatar.seleccionado = true;
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
