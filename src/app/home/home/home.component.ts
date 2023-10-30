import {Component, OnInit} from '@angular/core';
import {HomeService} from "../home.service";
import {first} from "rxjs";
import {HttpClientService} from "../../http-client.service";
import {EventDTO} from "../../../models/EventDTO";

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    msgError = "";
    listEvent: EventDTO[] = [];

    constructor(private homeService: HomeService,
                private http: HttpClientService) {
    }

    ngOnInit(): void {
        this.homeService.getListEvent().pipe(first())
            .subscribe({
                next: (response) => {
                    this.listEvent = response.data;
                    console.log(this.listEvent)
                },
                error: err => {
                    this.msgError = this.http.handleHttpError(err);
                    console.error(this.msgError);
                }
            });
    }

    getAvailabilityTag(event: EventDTO): string {
        if (event.remainingCapacity === Math.floor(event.capacity * 0.25))
            return "Bientôt épuisé";
        if (event.remainingCapacity === 0)
            return "Rupture";
        if (event.remainingCapacity === event.capacity || event.remainingCapacity < event.capacity)
            return "Dispo";
        else
            return "Limited availability";
    }

    getStarArray(event: EventDTO): string[] {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < Math.floor(event.rating)) {
                stars.push('bi-star-fill');
            } else if (i === Math.floor(event.rating) && event.rating % 1 !== 0) {
                stars.push('bi-star-half');
            } else {
                stars.push('bi-star');
            }
        }

        return stars;
    }

    isEventEndingSoon(event: EventDTO): boolean {
        const currentDate = new Date();
        const eventEndDate = new Date(event.endDate);

        // Define the threshold for "ending soon" (e.g., within 3 days)
        const endingSoonThreshold = 5; // Adjust as needed

        // Calculate the difference in days
        const timeDifference = Math.abs(eventEndDate.getTime() - currentDate.getTime());
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

        return daysDifference <= endingSoonThreshold;
    }
}
