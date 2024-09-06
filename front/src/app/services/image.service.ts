import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom, } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ImageService {

    private defaultAvatar = 'assets/avatars/av-2.png';

    private maxCacheSize = 100; // Tamaño máximo de la cola
    private profileImageCache = new Map<string, {url: string; timestamp: number }>();
    private postImageCache = new Map<string, {url: string; timestamp: number }>();

    constructor(
        private http: HttpClient
    ) {}

    private updateCache(cache: Map<string, {url: string; timestamp: number }>, imagePath: string, blobUrl: string) {
        // Añadir a la caché con el timestamp actual
        const currentTime = Date.now();
        cache.set(imagePath, { url: blobUrl, timestamp: currentTime });

        // Eliminar la imagen más antigua si se supera el tamaño máximo
        if (cache.size > this.maxCacheSize) {
            // Ordenar por timestamp y eliminar la más antigua
            const oldestEntry = [...cache.entries()].reduce((oldest, [key, value]) => {
                return (value.timestamp < oldest.timestamp) ? { key, ...value } : oldest;
            }, { key: '', url: '', timestamp: Infinity });
            
            cache.delete(oldestEntry.key);
        }
    }

    async getProfileImageUrl(imagePath: string | undefined): Promise<string> {

        var blobUrl;

        if (!imagePath || imagePath === '') {
            return this.defaultAvatar;
        }

        // Comprobar en la caché
        if (this.profileImageCache.has(imagePath)) {
            blobUrl = this.profileImageCache.get(imagePath)!.url;;
        }
        else{
            try {
                const response = await firstValueFrom(this.http.get(`${environment.apiUrl}${environment.profileImages}/${imagePath}`, { responseType: 'blob' }));
                blobUrl = URL.createObjectURL(response);
                
            } catch (error) {
                console.error('Error fetching image:', error);
                return this.defaultAvatar;
            }
        }
        this.updateCache(this.profileImageCache, imagePath, blobUrl);
        return blobUrl;
    }

    async getPostImageUrl(imagePath: string | undefined): Promise<string> {

        var blobUrl;

        if (!imagePath || imagePath == '') {
            return ''; // Avatar por defecto
        }
        // Comprobar en la caché
        if (this.postImageCache.has(imagePath)) {
            blobUrl = this.postImageCache.get(imagePath)!.url;;
        }
        else{
            try {
                const response = await firstValueFrom(this.http.get(`${environment.apiUrl}${environment.postImages}/${imagePath}`, { responseType: 'blob' }));
                blobUrl = URL.createObjectURL(response);
            } catch (error) {
                console.error('Error fetching image:', error);
                return ''; // Avatar por defecto en caso de error
            }
        }
        this.updateCache(this.postImageCache, imagePath, blobUrl);
        return blobUrl;
    }

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






}
