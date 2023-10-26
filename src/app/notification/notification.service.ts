import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private showNotificationSubject = new Subject<boolean>();
  private messageSubject = new Subject<string>();
  private notificationType = new Subject<string>();

  showNotification$ = this.showNotificationSubject.asObservable();
  message$ = this.messageSubject.asObservable();
  type$ = this.notificationType.asObservable();
  toggleNotification(show: boolean) {
    this.showNotificationSubject.next(show);
  }
  changeMessage(message: string, type : string) {
    this.messageSubject.next(message);
    this.notificationType.next(type);
  }
}
