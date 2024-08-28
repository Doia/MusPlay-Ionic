import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationModel } from '../models/notificationModel';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) { }

  public async getUserNotifications(): Promise<NotificationModel[]> {

    const data = await firstValueFrom(this.http.get<{data: NotificationModel[]}>(`${environment.apiUrl}/users/notifications/${this.accountService.userValue?.id}`));

    return data.data;
  }
}
