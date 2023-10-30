import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, finalize, first, Observable, ReplaySubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class HttpClientService {

    private loadingSubject = new BehaviorSubject<boolean>(false);
    private apiUrl = "http://localhost:80/api/v0"

    constructor(private http: HttpClient) {
    }

    get(url: string, httpOptions?: any): Observable<any> {
        this.loadingSubject.next(true);
        return this.http.get(`${this.apiUrl}${url}`, httpOptions).pipe(
            finalize(() => this.loadingSubject.next(false))
        );
    }

    post(url: string, body?: any, httpOptions?: any): Observable<any> {
        this.loadingSubject.next(true);
        return this.http.post(`${this.apiUrl}${url}`, body, httpOptions).pipe(
            finalize(() => this.loadingSubject.next(false))
        );
    }

    validate(token: string) {
        this.loadingSubject.next(true);
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`
            })
        };
        return this.http.get(`${this.apiUrl}/users/validate`, httpOptions)
            .pipe(
                finalize(() => this.loadingSubject.next(false))
            );
    }

    isLoading(): Observable<boolean> {
        return this.loadingSubject.asObservable();
    }

    handleHttpError(errorResponse: HttpErrorResponse): string {
        switch (errorResponse.status) {
            case 400:
                return 'Mauvaise Requête : Le serveur n\'a pas pu comprendre la requête.';
            case 401:
                return 'Non Autorisé : L\'authentification a échoué ou l\'utilisateur n\'a pas les permissions nécessaires.';
            case 403:
                return 'Interdit : Identifiant incorrect';
            case 404:
                return 'Non Trouvé : La ressource demandée n\'a pas pu être trouvée sur le serveur.';
            case 500:
                return 'Erreur Interne du Serveur : Une condition inattendue a été rencontrée par le serveur.';
            default:
                return `Connexion refusée : Le serveur est inaccessible. Status code ${errorResponse.status}`;
        }
    }
}
