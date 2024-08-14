import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import {jwtDecode} from 'jwt-decode';
import { ProfileService } from './profile.service';


@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;
    public isLoggedIn: boolean



    constructor(
        private router: Router,
        private http: HttpClient,
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
        if (this.userSubject.value){
            this.isLoggedIn = true;
        }
        else{
            this.isLoggedIn = false;
        }
    }

    public get userValue() {
        return this.userSubject.value;
    }

    async login(username: string, password: string): Promise<boolean> {
        try {
            const data: User = await lastValueFrom(this.http.post(environment.apiUrl + '/login', { username, password }));
            
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify({ username: data.username, token: data.token, role: data.roles}));
            this.userSubject.next(data);
            this.isLoggedIn = true;
        } catch (error) {
            this.isLoggedIn = false;
            console.error('Error occurred:', error);
        }
        return this.isLoggedIn;
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
    }

    async register(user: User) {

        var isRegister: boolean = false;

        try {
            const data = await lastValueFrom(this.http.post(`${environment.apiUrl}/register`, user));
            isRegister = true;
        } catch (error) {
            isRegister = false;
            console.error('Error occurred:', error);
        }
        return isRegister;
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    async getUserById(id: string): Promise<User | undefined> {
        try {
          // Convierte el Observable a Promise usando firstValueFrom
          const user = await firstValueFrom(this.http.get<User>(`${environment.apiUrl}/users/id/${id}`));
          return user;
        } catch (error) {
          // Maneja el error (puedes mostrar un mensaje al usuario, etc.)
          console.error('Error fetching user by id:', error);
          return undefined; // Puedes manejar el error de otra manera según el caso
        }
    }

    async getUserByUsername(username: string): Promise<User | undefined> {
        try {
          // Convierte el Observable a Promise usando firstValueFrom
          const user = await firstValueFrom(this.http.get<User>(`${environment.apiUrl}/users/username/${username}`));
          return user;
        } catch (error) {
          // Maneja el error (puedes mostrar un mensaje al usuario, etc.)
          console.error('Error fetching user by id:', error);
          return undefined; // Puedes manejar el error de otra manera según el caso
        }
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/users/id/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue?.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue?.id) {
                    this.logout();
                }
                return x;
            }));
    }

    updateUser(user: User){
        return true;
    }

    // Método para obtener el ID del usuario desde el token
    public getUsernameFromToken(): string | null {
        const user = this.userValue;
        if (user && user.token) {
            try {
                const decoded: any = jwtDecode(user.token);
                return decoded?.username || null; // Ajusta el nombre de la propiedad según tu token
            } catch (error) {
                console.error('Error decoding token:', error);
                return null;
            }
        }
        return null;
    }


}
