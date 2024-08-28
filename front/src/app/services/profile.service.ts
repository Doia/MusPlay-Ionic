import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { User } from '../models/user';



//Carga y guarda la informacion de usuario

@Injectable({ providedIn: 'root' })
export class ProfileService {

    private profileUser: User  = { id: '',username: '' };

    constructor(
        private accountService: AccountService
    ) {}

    public async getUserProfile(username: string){
        if (username != this.profileUser.username){
            this.profileUser = await this.accountService.getUserByUsername(username) ?? { id: '',username: '' };
            console.log(this.profileUser);
        }
        return this.profileUser;
    }

    public setUserProfile(newUser : User){
        this.profileUser = JSON.parse(JSON.stringify(newUser));
    }

    public clearService(){
        this.profileUser = { id: '',username: '' };
    }
}