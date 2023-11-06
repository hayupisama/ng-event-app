import {Injectable} from '@angular/core';
import {HttpClientService} from "../http-client.service";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(private http: HttpClientService) {
    }

    getListEvent() {
        const token = localStorage.getItem('jwtToken');
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`
            })
        };
        return this.http.get('/events/getAllEvents', httpOptions);
    }

    createReservation(user_id: number, event_id: number, number_of_person: number) {
        const body = {user_id, event_id, number_of_person};
        const token = localStorage.getItem('jwtToken');
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`
            })
        };
        return this.http.post('/reservations/createReservation', body, httpOptions);
    }
}
