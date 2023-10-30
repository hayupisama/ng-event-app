import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {NotificationService} from "../../notification/notification.service";
import {Router} from "@angular/router";
import {RegisterService} from "../register.service";
import {first} from "rxjs";
import {HttpClientService} from "../../http-client.service";

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.compoent.css']
})
export class RegisterComponent {
    registerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private notificationService: NotificationService,
        private router: Router,
        private registerService: RegisterService,
        private http: HttpClientService) {
        this.registerForm = this.fb.group({
            nom: ['', [Validators.required, Validators.pattern(/[A-Za-zÀ-ÖØ-öø-ÿ\s]+/)]],
            prenom: ['', [Validators.required, Validators.pattern(/[A-Za-zÀ-ÖØ-öø-ÿ\s]+/)]],
            dateNaissance: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            username: ['', [Validators.required, Validators.pattern(/^0\d{9}$|^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)]],
            password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{12,}$/)]],
            confirmPassword: ['', [Validators.required, this.matchValue('password')]]
        });
    }


    get nom() {
        return this.registerForm.get('nom');
    }

    get prenom() {
        return this.registerForm.get('prenom');
    }

    get dateNaissance() {
        return this.registerForm.get('dateNaissance');
    }

    get username() {
        return this.registerForm.get('username');
    }

    get password() {
        return this.registerForm.get('password');
    }

    get confirmPassword() {
        return this.registerForm.get('confirmPassword');
    }


    get gender() {
        return this.registerForm.get('gender');
    }

    onSubmit() {
        if (this.registerForm.valid) {
            this.registerService.register(
                this.registerForm.controls['username'].value,
                this.registerForm.controls['password'].value,
                this.registerForm.controls['username'].value.toString().startsWith('0')
                    ? 'noMail@gmail.com'
                    : this.registerForm.controls['username'].value,
                `${(this.registerForm.controls['nom'].value).toUpperCase()} ${this.registerForm.controls['prenom'].value}`,
                this.registerForm.controls['gender'].value,
                this.registerForm.controls['dateNaissance'].value,
                'FR'
            ).pipe(first())
                .subscribe({
                    next: (response) => {
                        console.log(response.data);
                        this.notificationService.toggleNotification(true);
                        this.notificationService.changeMessage('Inscription réussi, redirection...', 'success');
                        this.router.navigate(['/login']);
                    },
                    error: err => {
                        this.notificationService.toggleNotification(true);
                        this.notificationService.changeMessage(`Inscription à échouée ${this.http.handleHttpError(err)}`, 'danger');
                    }
                });

        }
    }

    getCustomClassNom() {
        if (this.nom)
            return `form-control ${!this.nom.dirty && !this.nom.touched
                ? ''
                : this.nom.valid
                    ? 'is-valid'
                    : 'is-invalid'}`;
        else
            return `form-control`;
    }

    getCustomClassPrenom() {
        if (this.prenom)
            return `form-control ${!this.prenom.dirty && !this.prenom.touched
                ? ''
                : this.prenom.valid
                    ? 'is-valid'
                    : 'is-invalid'}`;
        else
            return `form-control`;
    }

    getCustomClassDateNaissance() {
        if (this.dateNaissance)
            return `form-control ${!this.dateNaissance.dirty && !this.dateNaissance.touched
                ? ''
                : this.dateNaissance.valid
                    ? 'is-valid'
                    : 'is-invalid'}`;
        else
            return `form-control`;
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

    getCustomClassConfirmPassword() {
        if (this.confirmPassword)
            return `form-control ${!this.confirmPassword.dirty && !this.confirmPassword.touched
                ? ''
                : this.confirmPassword.valid
                    ? 'is-valid'
                    : 'is-invalid'}`;
        else
            return `form-control`;
    }

    matchValue(matchTo: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            const matchingControl = control.root.get(matchTo);

            if (matchingControl && value !== matchingControl.value) {
                return {matchValue: true};
            }

            return null;
        };
    }

    navigateToLoginPage() {
        this.router.navigate(['/login']);
    }
}
