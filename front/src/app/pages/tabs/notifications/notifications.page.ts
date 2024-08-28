import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NotificationService } from 'src/app/services/notificationService';
import { TimeParser } from '../../../utils/TimeParser';
import { NotificationModel } from 'src/app/models/notificationModel';
import { User } from 'src/app/models/user';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage {

  notifications: NotificationModel[] = [];
  profileImages: { [userId: string]: string } = {}; // Diccionario para almacenar las URLs de las imágenes de perfil

  constructor(
    private navCtrl: NavController,
    private notificationService: NotificationService,
    private imageService: ImageService,
    private timeParser: TimeParser
  ) {}

  ionViewWillEnter() {
    this.loadNotifications();
  }

  async loadNotifications() {
    this.notifications = await this.notificationService.getUserNotifications();
    await this.loadProfileImages();  // Cargar imágenes de perfil después de obtener las notificaciones
  }

  async loadProfileImages() {
    const imageRequests = this.notifications.map(async (notification) => {
      const user = notification.sender;
      if (user && user.imagePath) {
        const imageUrl = await this.imageService.getProfileImageUrl(user.imagePath);
        console.log(imageUrl);
        if (user.id){
          this.profileImages[user.id] = imageUrl;
        }
          // Guardar la URL en el diccionario
      }
    });
    await Promise.all(imageRequests);  // Esperar a que todas las imágenes se carguen
  }

  goToFeed() {
    this.navCtrl.navigateBack(`/tabs/feed`);
  }

  parseTime(createdAt: Date | undefined): string {
    return this.timeParser.parseTime(createdAt);
  }

  // Método para obtener la URL de la imagen de perfil en el template
  getProfileImage(userId: string): string {
    return this.profileImages[userId] || 'assets/avatars/default-avatar.png'; // Usar un avatar por defecto si no hay imagen
  }
}
