import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from "../../notification/notification.service";
import {Router} from "@angular/router";
import {LoginService} from "../login.service";
import {catchError, first, tap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {HttpClientService} from "../../http-client.service";

@Component({
    selector: 'app-login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;
    isSuccessLogin = false;
    user: any = undefined;
    msgError: string = "";

    constructor(private fb: FormBuilder,
                private notificationService: NotificationService,
                private router: Router,
                private loginService: LoginService,
                private http: HttpClientService) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.pattern(/^0\d{9}$|^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)]],
            password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{12,}$/)]]
        });
    }

    get username() {
        return this.loginForm.get('username');
    }

    get password() {
        return this.loginForm.get('password');
    }


    onSubmit() {
        if (this.loginForm.valid) {
            const username = this.loginForm.get('username')?.value;
            const password = this.loginForm.get('password')?.value;

            this.loginService.login(username, password).pipe(first())
                .subscribe({
                    next: (response) => {
                        this.user = response.data;
                        this.notificationService.toggleNotification(true);
                        this.notificationService.changeMessage(`Bienvenu ${this.user.fullName}`, 'success');
                        this.isSuccessLogin = true;
                        const token = response.data.access_token;
                        localStorage.setItem("jwtToken", token);
                        this.router.navigate(['/home']);
                    },
                    error: err => {
                        this.isSuccessLogin = false;
                        this.msgError = this.http.handleHttpError(err);
                    }
                });
        }
    }

    getCustomClassUsername() {
        if (this.username)
            return `form-control ${!this.username.dirty && !this.username.touched
                ? ''
                : this.username.valid
                    ? 'is-valid'
                    : 'is-invalid'}`;
        else
            return `form-control`;
    }

    getCustomClassPassword() {
        if (this.password)
            return `form-control ${!this.password.dirty && !this.password.touched
                ? ''
                : this.password.valid
                    ? 'is-valid'
                    : 'is-invalid'}`;
        else
            return `form-control`;
    }

    navigateToRegisterPage() {
        this.router.navigate(['/register']);
    }


    protected readonly undefined = undefined;
}
