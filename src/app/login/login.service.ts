import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpClientService} from "../http-client.service";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClientService) {
    }

    login(username: string, password: string): Observable<any> {
        const body = { username, password };
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post(`/users/login`, body, httpOptions);
    }


}


