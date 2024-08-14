import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AccountService } from '../../services/account.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  passwordVisible = false;

  registerUser: User = {
    email: '',
    password: '',
    username: '',
    phone: '',
  };


  constructor( private accountService: AccountService,
    private navCtrl: NavController,
    private uiService: UiServiceService
   ) { }

  ngOnInit() {
  }

  async registro( fRegistro: NgForm ) {

    if ( fRegistro.invalid ) { return; }

    const valido = await this.accountService.register( this.registerUser );

    if ( valido ) {
      // navegar al login
      this.goToLogin();
    } else {
      // mostrar alerta de usuario y contraseña no correctos
      this.uiService.alertaInformativa('Ese correo electrónico ya existe.');
    }


  }

  goToLogin() {
    this.navCtrl.navigateBack( '/login', { animated: true } );
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
