import { Component } from '@angular/core';
import { PostsService } from '../../../services/posts.service';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource, ImageOptions } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-create-post',
  templateUrl: 'create-post.page.html',
  styleUrls: ['create-post.page.scss']
})
export class CreatePostPage {

  tempImages: string[] = [];
  cargandoGeo = false;

  post = {
    mensaje: '',
    coords: '',
    posicion: false
  };

  constructor(private postsService: PostsService,
              private route: Router) { }

  async crearPost() {
    console.log(this.post);
    const creado = await this.postsService.crearPost(this.post);

    this.post = {
      mensaje: '',
      coords: '',
      posicion: false
    };

    this.tempImages = [];

    this.route.navigateByUrl('/main/tabs/tab1');
  }

  async getGeo() {
    if (!this.post.posicion) {
      this.post.coords = '';
      return;
    }

    this.cargandoGeo = true;

    try {
      const position = await Geolocation.getCurrentPosition();
      const coords = `${position.coords.latitude},${position.coords.longitude}`;
      console.log(coords);
      this.post.coords = coords;
    } catch (error) {
      console.log('Error getting location', error);
    } finally {
      this.cargandoGeo = false;
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

      // Para manejar la imagen, puedes usar la URL de la web (webPath) directamente.
      this.postsService.subirImagen(imageUrl);
      this.tempImages.push(imageUrl);
    } catch (err) {
      console.error('Error taking picture', err);
    }
  }
}
