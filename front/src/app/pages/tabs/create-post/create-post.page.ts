import { Component } from '@angular/core';
import { PostsService } from '../../../services/posts.service';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource, ImageOptions } from '@capacitor/camera';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-create-post',
  templateUrl: 'create-post.page.html',
  styleUrls: ['create-post.page.scss']
})
export class CreatePostPage {

  tempImages: string[] = [];
  cargandoGeo = false;

  post: { text: string } = {
    text: ''
  };

  constructor(private postsService: PostsService,
              private route: Router) { }

  ionViewWillEnter() {
    this.tempImages  = [];
    this.cargandoGeo = false;

    this.post  = {
      text: ''
    };
  }

  async crearPost() {
    try {
      // Convertir las URLs de las imágenes en Blobs
      const imageBlobs = await Promise.all(
        this.tempImages.map(async (image) => {
          const response = await fetch(image);
          return response.blob();
        })
      );

      // Enviar el post junto con las imágenes al servicio
      const creado = await this.postsService.crearPost({ text: this.post.text }, imageBlobs);

      // Limpiar el formulario después de crear el post
      this.post.text = '';
      this.tempImages = [];

      // Redirigir a la página de feed
      this.route.navigateByUrl('/tabs/feed');
    } catch (error) {
      console.error('Error al crear el post:', error);
    }
  }

  async camara() {
    const options = {
      quality: 60,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      correctOrientation: true
    };

    this.procesarImagen(options);
  }

  async libreria() {
    const options = {
      quality: 60,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      correctOrientation: true
    };

    this.procesarImagen(options);
  }

  async procesarImagen(options: ImageOptions) {
    try {
      const image = await Camera.getPhoto(options);
      const imageUrl = image.webPath || '';

      // Agregar la URL de la imagen temporalmente
      this.tempImages.push(imageUrl);
    } catch (err) {
      console.error('Error taking picture', err);
    }
  }
}
