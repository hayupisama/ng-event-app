import {Component, Input, OnInit} from '@angular/core';
import {NotificationService} from "./notification.service";

@Component({
  selector: 'app-notification',
  template: `
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div id="liveToast" class="toast border-0" [ngClass]="getCustomClass()" role="alert" aria-live="assertive"
           aria-atomic="true">
        <div class="toast-header">
          <img src="../../assets/cropped-logo-32x32.svg" style="width: 24px" class="rounded me-2" alt="...">
          <strong class="me-auto">Wemoov Notification</strong>
          <small>à {{ currentTime | date: 'HH:mm:ss' }}</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          {{message}}
        </div>

      </div>
    </div>
  `,
  styles: [
  ]
})
export class NotificationComponent implements OnInit {
  currentTime: Date = new Date();
  @Input() message: string = "Bonjour Wemoov";
  @Input() type: string = "success";
  @Input() showNotification = false;

  constructor(private notificationService: NotificationService) {}

  getCustomClass(){
    return `bg-${this.type}-subtle ${this.showNotification ? 'show' : 'hide'}`
  }

  ngOnInit(): void {
    this.notificationService.showNotification$.subscribe((show) => {
      this.showNotification = show;
      if (show) {
        setTimeout(() => {
          this.showNotification = false;
        }, 5000); // Hide after 5000ms (5 seconds)
      }
    });
    this.notificationService.message$.subscribe((message) => {
      this.message = message;
    });
    this.notificationService.type$.subscribe((type) => {
      this.type = type;
    });
  }
}
