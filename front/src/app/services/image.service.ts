import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { AccountService } from './account.service';


@Injectable({ providedIn: 'root' })
export class ImageService {

    private defaultAvatar = 'assets/avatars/av-2.png';

    constructor(
        private http: HttpClient,
        private accountService : AccountService
    ) {}

    async uploadImage(file: File): Promise<string> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);

        try {
            const response : any = await firstValueFrom(this.http.post(`${environment.apiUrl}/profile-images/upload`, formData));
            return response.profileImagePath; // Devuelve la ruta de la imagen
          } catch (error) {
            console.error('Error uploading image:', error);
            return '';
        }
    }
    
    getImageUrl(filename: string): string {
        return `${environment.apiUrl}/profile-images/get/${filename}`;
    }

    async getProfileImageUrl(imagePath: string | undefined): Promise<string> {

        if (!imagePath || imagePath == '') {
            return this.defaultAvatar; // Avatar por defecto
        }
    
        try {
            const response = await firstValueFrom(this.http.get(`${environment.apiUrl}${environment.profileImages}/${imagePath}`, { responseType: 'blob' }));
            // Crear un URL de objeto para el blob
            const blobUrl = URL.createObjectURL(response);
            // Opcional: Manejar la revocación del URL en el componente
            return blobUrl;
        } catch (error) {
            console.error('Error fetching image:', error);
            return this.defaultAvatar; // Avatar por defecto en caso de error
        }

    }

    async getPostImageUrl(imagePath: string | undefined): Promise<string> {

        if (!imagePath || imagePath == '') {
            return ''; // Avatar por defecto
        }
    
        try {
            const response = await firstValueFrom(this.http.get(`${environment.apiUrl}${environment.postImages}/${imagePath}`, { responseType: 'blob' }));
            // Crear un URL de objeto para el blob
            const blobUrl = URL.createObjectURL(response);
            // Opcional: Manejar la revocación del URL en el componente
            return blobUrl;
        } catch (error) {
            console.error('Error fetching image:', error);
            return ''; // Avatar por defecto en caso de error
        }

    }




}
