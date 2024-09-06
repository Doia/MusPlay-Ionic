import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, catchError, of } from 'rxjs';
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

  public async acceptFollowRequest(requestId: number): Promise<boolean> {
    try {
      await firstValueFrom(
        this.http.put<void>(`${environment.apiUrl}/users/followRequest/accept/${requestId}`, {})
          .pipe(catchError(() => of(false))) // Catch any errors and return false
      );
      return true;
    } catch (error) {
      console.error('Error accepting follow request', error);
      return false;
    }
  }

  public async rejectFollowRequest(requestId: number): Promise<boolean> {
    try {
      await firstValueFrom(
        this.http.put<void>(`${environment.apiUrl}/users/followRequest/reject/${requestId}`, {})
          .pipe(catchError(() => of(false))) // Catch any errors and return false
      );
      return true;
    } catch (error) {
      console.error('Error rejecting follow request', error);
      return false;
    }
  }
}
