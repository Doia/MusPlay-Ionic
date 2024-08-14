import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user';
import { Post } from '../models/post';


@Injectable({ providedIn: 'root' })
export class PostsService {
    constructor(
        private router: Router,
        private http: HttpClient
    ) {}

    getPosts(pull: boolean = false): Observable<Post[]> {
        // Aquí deberías hacer la llamada a una API o cargar datos locales.
        const dummyPosts: Post[] = [
          {
            id: 1,
            owner: { username: '@pepe', imagePath: 'assets/avatars/av-2.png'},
            date: 'Hace 2 horas',
            content: 'Este es un post de ejemplo',
            imagePath: 'assets/perro-1.jpg',
            comments: [
              { id: 1, owner: { username: '@Juan', imagePath: 'assets/avatars/av-4.png'}, content: 'Buen post!', date: 'Hace 2 horas' },
              { id: 2, owner: { username: '@Alba', imagePath: 'assets/avatars/av-5.png'}, content: 'Interesante!', date: 'Hace 4 horas' },
            ]
          },
          {
            id: 2,
            owner: { username: '@Jonh' , imagePath: 'assets/avatars/av-6.png'},
            date: 'Hace 1 hora',
            content: 'Este es el contenido de mi primer post.',
            imagePath: 'assets/perro-2.jpg', // Ruta a una imagen de ejemplo
            comments: [
              { id: 3, owner: { username: '@Juan', imagePath: 'assets/avatars/av-4.png'}, content: 'Buen post!', date: 'Hace 2 dias' },
              { id: 4, owner: { username: '@Alba', imagePath: 'assets/avatars/av-5.png'}, content: 'Interesante!', date: 'Hace 4 años' },
            ]
          },
          {
            id: 3,
            owner: { username: '@Juan', imagePath: 'assets/avatars/av-4.png'},
            date: 'Hace 2 horas',
            content: 'Aquí está mi segundo post, con una foto increíble.',
            imagePath: 'assets/perro-3.jpg', // Ruta a una imagen de ejemplo
            comments: [
                { id: 5, owner: { username: '@Alberto' , imagePath: 'assets/avatars/av-3.png'}, content: 'Buen post!', date: 'Hace 30 min' },
                { id: 6, owner: { username: '@Lucas', imagePath: 'assets/avatars/av-1.png'}, content: 'Interesante!', date: 'Hace 1 hora' },
            ]
          }
          // Otros posts de ejemplo
        ];
    
        return of(dummyPosts);
      }
}

