import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NotificationService } from 'src/app/services/notificationService';
import { TimeParser } from '../../../utils/TimeParser';
import { NotificationModel } from 'src/app/models/notificationModel';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage {

  notifications: NotificationModel[] = [];
  profileImages: { [userId: number]: string } = {}; // Diccionario para almacenar las URLs de las imágenes de perfil

  constructor(
    private navCtrl: NavController,
    private notificationService: NotificationService,
    private imageService: ImageService,
    private timeParser: TimeParser
  ) {}

  async ionViewWillEnter() {
    await this.loadNotifications();
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
        if (user.id) {
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
  getProfileImage(userId: number): string {
    return this.profileImages[userId] || 'assets/avatars/default-avatar.png'; // Usar un avatar por defecto si no hay imagen
  }

  async acceptFollowRequest(notification: NotificationModel): Promise<void> {
    const success = await this.notificationService.acceptFollowRequest(notification.followRequest!.id);
    if (success) {
      // Actualizar la lista de notificaciones para reflejar la aceptación
      notification.followRequest!.status = 'ACCEPTED';
    } else {
      console.error('Failed to accept follow request');
    }
  }

  async rejectFollowRequest(notification: NotificationModel): Promise<void> {
    const success = await this.notificationService.rejectFollowRequest(notification.followRequest!.id);
    if (success) {
      // Actualizar la lista de notificaciones para reflejar el rechazo
      notification.followRequest!.status = 'REJECTED';
    } else {
      console.error('Failed to reject follow request');
    }
  }

  getNotificationMessage(notification: NotificationModel): string {
    switch (notification.type) {
      case 'LIKE':
        return `@${notification.sender.username} le ha gustado tu publicación.`;
      case 'FOLLOW':
        return `@${notification.sender.username} ha comenzado ha seguirte.`;
      case 'COMMENT':
        return `@${notification.sender.username} ha comentado en tu publicación.`;
      case 'FOLLOW_REQUEST':
        switch (notification.followRequest?.status) {
          case 'ACCEPTED':
            return `@${notification.sender.username} ha comenzado ha seguirte.`;
          case 'REJECTED':
            return `@${notification.sender.username} quiso seguirte.`;
          case 'PENDING':
            return `@${notification.sender.username} quiere seguirte.`;
          default:
            return 'You have a new notification.';
        }  
      default:
        return 'You have a new notification.';
    }
  }
}
