import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginModule} from "./login/login.module";
import { NotificationComponent } from './notification/notification.component';
import {RegisterModule} from "./register/register.module";
import {HttpClientModule} from "@angular/common/http";
import { LoadingComponent } from './loading/loading.component';
import {HomeModule} from "./home/home.module";

@NgModule({
    declarations: [
        AppComponent,
        NotificationComponent,
        LoadingComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        LoginModule,
        RegisterModule,
        HomeModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
