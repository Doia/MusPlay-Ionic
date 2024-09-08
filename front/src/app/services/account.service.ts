import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, BehaviorSubject, Observable, firstValueFrom, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;
    public isLoggedIn: boolean;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        const storedUser = localStorage.getItem('user');
        this.userSubject = new BehaviorSubject(storedUser ? JSON.parse(storedUser) : null);
        this.user = this.userSubject.asObservable();
        this.isLoggedIn = !!this.userSubject.value;
    }

    public get userValue(): User | null {
        return this.userSubject.value;
    }

    async login(identifier: string, password: string): Promise<boolean> {
        try {
            const data: any = await lastValueFrom(this.http.post(`${environment.apiUrl}/auth/login`, { identifier, password }));

            // Guarda el token
            localStorage.setItem('token', data.token);
            localStorage.setItem('refreshToken', data.refreshToken);

            // Obtener todos los datos del usuario con el token recibido
            const userLogged: User | undefined = await this.getUserByUsername(data.username);

            if (userLogged) {

                // Guardar usuario con todos los datos y token en localStorage
                localStorage.setItem('user', JSON.stringify(userLogged));

                // Actualizar el BehaviorSubject con los datos del usuario
                this.userSubject.next(userLogged);
                this.isLoggedIn = true;
            } else {
                localStorage.removeItem('user');
                this.isLoggedIn = false;
            }
        } catch (error) {
            this.isLoggedIn = false;
            console.error('Error occurred during login:', error);
        }
        return this.isLoggedIn;
    }

    logout(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        this.userSubject.next(null);
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
    }

    async register(user: User): Promise<boolean> {
        try {
            const response = await lastValueFrom(this.http.post(`${environment.apiUrl}/auth/register`, user));
            return true;
        } catch (error) {
            console.error('Error occurred during registration:', error);
            return false;
        }
    }

    async refreshToken(refreshToken: string): Promise<{}> {
        try {
            const response = await lastValueFrom(this.http.post(`${environment.apiUrl}/auth/refresh`, {refreshToken}));
            return response;
        } catch (error) {
            console.error('Error occurred:', error);
            return {};
        }
    }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    async getUserById(id: string): Promise<User | undefined> {
        try {
            return await firstValueFrom(this.http.get<User>(`${environment.apiUrl}/users/id/${id}`));
        } catch (error) {
            console.error('Error fetching user by id:', error);
            return undefined;
        }
    }

    async getUserByUsername(username: string): Promise<User | undefined> {
        try {
            return await firstValueFrom(this.http.get<User>(`${environment.apiUrl}/users/username/${username}`));
        } catch (error) {
            console.error('Error fetching user by username:', error);
            return undefined;
        }
    }

    async searchUsersByText(text: string): Promise<any> {
        try {
            const data = await firstValueFrom(this.http.get<any>(`${environment.apiUrl}/users/search/${text}`));
            return data.data;
        } catch (error) {
            console.error('Error searching users by text:', error);
            return [];
        }
    }

    update(id: number, params: any): Observable<any> {
        return this.http.put(`${environment.apiUrl}/users/id/${id}`, params)
            .pipe(map(x => {
                if (id === this.userValue?.id) {
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                if (id === this.userValue?.id) {
                    this.logout();
                }
                return x;
            }));
    }

    async updateUser(user: User): Promise<boolean> {
        try {
            const response = await firstValueFrom(this.http.put<{ msg: String, user: User  }>(`${environment.apiUrl}/users/${user.id}`, user));
    
            const updatedUser : User = new User(response.user);
            // Actualizar el usuario almacenado en localStorage si es el mismo que el usuario actualizado
            if (updatedUser && user.id === this.userValue?.id) {
                localStorage.setItem('user', JSON.stringify(updatedUser));
                this.userSubject.next(updatedUser);
            }
    
            return true;
        } catch (error) {
            console.error('Error updating user:', error);
            return false;
        }
    }

    public getUsernameFromToken(): string | null {
        const user = this.userValue;
        if (user && user.token) {
            try {
                const decoded: any = jwtDecode(user.token);
                return decoded?.username || null;
            } catch (error) {
                console.error('Error decoding token:', error);
                return null;
            }
        }
        return null;
    }
}
