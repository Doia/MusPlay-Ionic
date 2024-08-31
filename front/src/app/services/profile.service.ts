import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { User } from '../models/user';



//Carga y guarda la informacion de usuario

@Injectable({ providedIn: 'root' })
export class ProfileService {

    private profileUser: User  = new User({ id: 0, username: '' });

    constructor(
        private accountService: AccountService
    ) {}

    public async getUserProfile(username: string){
        if (username != this.profileUser.username){
            this.profileUser = await this.accountService.getUserByUsername(username) ?? new User({});
            console.log(this.profileUser);
        }
        return this.profileUser;
    }

    public setUserProfile(newUser : User){
        this.profileUser = JSON.parse(JSON.stringify(newUser));
    }

    public clearService(){
        this.profileUser = new User({});
    }
}