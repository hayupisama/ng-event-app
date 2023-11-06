import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClientService} from "../http-client.service";
import UserDTO from "../../models/UserDTO";

@Injectable({
    providedIn: 'root'
})
export class LoginService {


    constructor(private http: HttpClientService) {
    }

    login(username: string, password: string): Observable<any> {
        const body = {username, password};
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post(`/users/login`, body, httpOptions);
    }

    set setUserInfo(user: UserDTO) {
        localStorage.setItem('user', JSON.stringify(user))
    }

    get getUserInfo(): UserDTO | undefined {
        const user = localStorage.getItem('user');
        if (user)
            return JSON.parse(user);
        else return undefined;
    }

}


