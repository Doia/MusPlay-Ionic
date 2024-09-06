import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(private navCtrl: NavController,) {}

  goToNotifications() {
    this.navCtrl.navigateForward(`/tabs/notifications`);
  }

  // Método para navegar a la página de búsqueda
  goToSearchPage() {
    this.navCtrl.navigateForward(`/tabs/search-users`)
  }

  partida() {
    // Lógica para manejar el evento del botón "Partida"
  }

  torneo() {
    // Lógica para manejar el evento del botón "Torneo"
  }

}
