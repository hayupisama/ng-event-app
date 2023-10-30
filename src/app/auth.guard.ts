import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {HttpClientService} from "./http-client.service";
import {inject} from "@angular/core";
import {catchError, first, map, Observable, of} from "rxjs";
import {NotificationService} from "./notification/notification.service";


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const notificationService = inject(NotificationService);
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken || jwtToken.length === 0) {
        router.navigate(['/login']);
        return new Observable<boolean>(observer => observer.next(false));
    }
    const http = inject(HttpClientService);
    return http.validate(jwtToken).pipe(
        first(),
        map(() => true),
        catchError(() => {
            notificationService.toggleNotification(true);
            notificationService.changeMessage(`Votre session a expiré`, 'danger');
            router.navigate(['/login']);
            return of(false);
        })
    );
};


