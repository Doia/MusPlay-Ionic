import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable, of } from 'rxjs';
import { User } from '../models/user';
import { Post, transformarPost } from '../models/post';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PostsService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) {}

    /**
     * Crea un nuevo post junto con una o varias imágenes adjuntas.
     * @param post - Objeto post con el contenido del mensaje.
     * @param images - Array de imágenes en formato Blob o File. Puede ser vacío o no proporcionarse.
     * @returns Promise del post creado.
     */
    async crearPost(post: { text: string }, images: Blob[] = []): Promise<Post> {
        const formData = new FormData();
        formData.append('text', post.text);

        // Adjuntar las imágenes al FormData, si existen
        images.forEach((image, index) => {
            formData.append('file', image, `imagen_${index + 1}.jpg`);
        });

        try {
            const response: any = await firstValueFrom(this.http.post(`${environment.apiUrl}/posts`, formData, {
                headers: new HttpHeaders({
                    'Accept': 'application/json'
                })
            }));
            return transformarPost(response.post); // Transformar la respuesta al formato Post
        } catch (error) {
            console.error('Error creating post:', error);
            throw error; // Lanza el error para manejarlo en el componente
        }
    }

    /**
     * Convierte una URL de imagen a un Blob para enviar al servidor.
     * @param imageUrl - URL de la imagen a convertir.
     * @returns Promise que resuelve con un Blob.
     */
    private async convertirImagenABlob(imageUrl: string): Promise<Blob> {
        const response = await fetch(imageUrl);
        return await response.blob();
    }

    /**
     * Método para crear un post con una o varias imágenes adjuntas a partir de URLs de imagen.
     * @param post - Objeto post con el contenido del mensaje.
     * @param imageUrls - URLs de las imágenes seleccionadas.
     * @returns Promise del post creado.
     */
    async crearPostConImagenes(post: { text: string }, imageUrls: string[]): Promise<Post> {
        try {
            // Convertir todas las URLs de imágenes a Blobs
            const images: Blob[] = await Promise.all(imageUrls.map(this.convertirImagenABlob.bind(this)));

            // Llamar al método `crearPost` para enviar los datos al servidor
            return await this.crearPost(post, images);
        } catch (error) {
            console.error('Error creating post with images:', error);
            throw error; // Lanza el error para manejarlo en el componente
        }
    }

    /**
     * Obtiene los posts desde el servidor.
     * @param pull - Booleano para indicar si se debe hacer una nueva carga.
     * @returns Promise de la lista de posts.
     */
    async getPosts(pull: boolean = false): Promise<Post[]> {
        try {
            const response: any = await firstValueFrom(this.http.get<any>(`${environment.apiUrl}/posts/feed`));
            return response.posts.map(transformarPost); // Transformar cada post recibido
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error; // Lanza el error para manejarlo en el componente
        }
    }

        /**
     * Añade un like a un post.
     * @param postId - ID del post al que se le va a dar like.
     * @returns Observable de la respuesta del servidor.
     */
    addLike(postId: number): Observable<any> {
        return this.http.post(`${environment.apiUrl}/posts/${postId}/likes`, null, {
        headers: new HttpHeaders({
            'Accept': 'application/json',
        }),
        });
    }

    /**
     * Elimina un like de un post.
     * @param postId - ID del post al que se le va a quitar el like.
     * @returns Observable de la respuesta del servidor.
     */
    removeLike(postId: number): Observable<any> {
        return this.http.delete(`${environment.apiUrl}/posts/${postId}/likes`, {
        headers: new HttpHeaders({
            'Accept': 'application/json',
        }),
        });
    }

    getPostsDummies(pull: boolean = false): Observable<Post[]> {
        // Aquí deberías hacer la llamada a una API o cargar datos locales.
        const dummyPosts: Post[] = [
          {
            id: 1,
            owner: new User({ username: '@pepe', imagePath: 'assets/avatars/av-2.png' ,id: 0}),
            createdDate: new Date("2024-08-30T12:48:25.426909"),
            content: 'Este es un post de ejemplo',
            imagePath: 'assets/perro-1.jpg',
            likes: [],
            comments: [
              { id: 1, owner: new User({ username: '@Juan', imagePath: 'assets/avatars/av-4.png' ,id: 0}), content: 'Buen post!', createdAt: new Date("2024-08-30T12:18:25.426909") },
              { id: 2, owner: new User({ username: '@Alba', imagePath: 'assets/avatars/av-5.png' ,id: 0}), content: 'Interesante!', createdAt: new Date("2020-08-30T12:28:25.426909") },
            ]
          },
          {
            id: 2,
            owner: new User({ username: '@Jonh' , imagePath: 'assets/avatars/av-6.png' ,id: 0}),
            createdDate: new Date("2023-08-30T12:48:25.426909"),
            content: 'Este es el contenido de mi primer post.',
            imagePath: 'assets/perro-2.jpg', // Ruta a una imagen de ejemplo
            likes: [],
            comments: [
              { id: 3, owner: new User({ username: '@Juan', imagePath: 'assets/avatars/av-4.png', id: 0}), content: 'Buen post!', createdAt: new Date("2024-08-30T08:48:25.426909") },
              { id: 4, owner: new User({ username: '@Alba', imagePath: 'assets/avatars/av-5.png', id: 0}), content: 'Interesante!', createdAt: new Date("2024-08-30T10:48:25.426909") },
            ]
          },
          {
            id: 3,
            owner: { username: '@Juan', imagePath: 'assets/avatars/av-4.png', id: 0},
            createdDate: new Date("2024-08-26T12:48:25.426909"),
            content: 'Aquí está mi segundo post, con una foto increíble.',
            imagePath: 'assets/perro-3.jpg', // Ruta a una imagen de ejemplo
            likes: [],
            comments: [
                { id: 5, owner: { username: '@Alberto' , imagePath: 'assets/avatars/av-3.png', id: 0}, content: 'Buen post!', createdAt: new Date("2018-08-30T12:18:25.426909") },
                { id: 6, owner: { username: '@Lucas', imagePath: 'assets/avatars/av-1.png' , id: 0}, content: 'Interesante!', createdAt: new Date("2024-01-30T12:18:25.426909") },
            ]
          }
          // Otros posts de ejemplo
        ];
    
        return of(dummyPosts);
    }
}
