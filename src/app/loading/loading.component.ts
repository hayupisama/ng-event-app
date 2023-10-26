import {AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {HttpClientService} from "../http-client.service";
import {pairwise} from "rxjs";

@Component({
    selector: 'app-loading',
    templateUrl: 'loading.component.html',
    styleUrls: ['loading.component.css']
})
export class LoadingComponent implements AfterViewInit {


    isLoading$ = this.httpService.isLoading();
    showLoading = false;
    @ViewChild('loadingText')
    loadingText!: ElementRef;

    constructor(private httpService: HttpClientService) {
    }

    ngAfterViewInit() {
        this.isLoading$.pipe(pairwise()).subscribe(([prev, current]) => {
                this.showLoading = !!(!prev && current);
            }
        );
    }
}
