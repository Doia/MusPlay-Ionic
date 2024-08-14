import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {


  notifications = [
    {
      id: 1,
      profileImage: 'assets/avatars/av-3.png', // Cambia esta ruta a la imagen correspondiente
      user: 'marinavarrop',
      text: 'le ha gustado tu partida de mus.',
      date: '2 sem'
    },
    {
      id: 2,
      profileImage: 'assets/avatars/av-4.png', // Cambia esta ruta a la imagen correspondiente
      user: 'mermerce7',
      text: 'le ha gustado tu partida de mus.',
      date: '2 sem'
    }
    // Añade más notificaciones según sea necesario
  ];


  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goToFeed(){
    this.navCtrl.navigateBack(`/tabs/feed`);
  }

}
