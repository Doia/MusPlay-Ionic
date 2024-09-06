import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AccountService } from '../../services/account.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  passwordVisible = false;

  loginUser = {
    username: '',
    password: ''
  };


  constructor( private accountService: AccountService,
               private navCtrl: NavController,
               private uiService: UiServiceService
              ) { }

  ngOnInit() {
    
  }

  async login( fLogin: NgForm ) {

    if ( fLogin.invalid ) { return; }

    const valido = await this.accountService.login( this.loginUser.username, this.loginUser.password );

    console.log("Me quiero morir");
    console.log(valido);

    if ( valido ) {

      this.navCtrl.navigateRoot( '/tabs', { animated: true } );
    } else {
      this.uiService.alertaInformativa(`${environment.apiUrl}/login`);
      // mostrar alerta de usuario y contraseña no correctos
      //this.uiService.alertaInformativa('Usuario y contraseña no son correctos.');
    }


  }

  goToRegister() {
    this.navCtrl.navigateRoot( '/register', { animated: true } );
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }


}
