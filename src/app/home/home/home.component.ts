import {Component, OnInit} from '@angular/core';
import {HomeService} from "../home.service";
import {first} from "rxjs";
import {HttpClientService} from "../../http-client.service";

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    msgError = "";
    listEvent = [];

    constructor(private homeService: HomeService,
                private http: HttpClientService) {
    }

    ngOnInit(): void {
        this.homeService.getListEvent().pipe(first())
            .subscribe({
                next: (response) => {
                    this.listEvent = response.data;
                },
                error: err => {
                    this.msgError = this.http.handleHttpError(err);
                    console.error(this.msgError);
                }
            });
    }

}
