import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <app-notification [message]="'Hello world'"></app-notification>
      <app-loading></app-loading>
      <router-outlet></router-outlet>`,
  styles:[
      ``
  ]
})
export class AppComponent {
}
