import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ImageService {

    constructor(
        private http: HttpClient,
    ) {}

    async uploadImage(file: File): Promise<boolean> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        const data: any = await lastValueFrom(this.http.post(`${environment.apiUrl}/profile-images/upload`, formData));
        return true;
    }
    
    getImageUrl(filename: string): string {
        return `${environment.apiUrl}/profile-images/get/${filename}`;
    }



}
