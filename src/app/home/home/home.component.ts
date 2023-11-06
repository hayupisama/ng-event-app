import {Component, OnInit} from '@angular/core';
import {HomeService} from "../home.service";
import {first} from "rxjs";
import {HttpClientService} from "../../http-client.service";
import {EventDTO} from "../../../models/EventDTO";
import {NotificationService} from "../../notification/notification.service";
import {LoginService} from "../../login/login.service";
import UserDTO from "../../../models/UserDTO";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    msgError = "";
    listEvent: EventDTO[] = [];
    selectedEvent: EventDTO | undefined;
    minDate ="";
    maxDate="";
    reservationForm: FormGroup;

    constructor(private fb: FormBuilder,
                private homeService: HomeService,
                private notificationService: NotificationService,
                private userService: LoginService) {
        this.reservationForm = this.fb.group({
            reservationDate: ['', [Validators.required]],
            numberOfPeople: [1, [Validators.required, Validators.min(1)]]
        });
    }

    ngOnInit(): void {
        this.loadListEvent();
    }


    loadListEvent() {
        this.homeService.getListEvent().pipe(first())
            .subscribe({
                next: (response) => {
                    this.listEvent = response.data.sort((a: any, b: any) => {
                        if (a.name < b.name) {
                            return -1;
                        }
                        if (a.name > b.name) {
                            return 1;
                        }
                        return 0;
                    });
                },
                error: err => {
                    this.notificationService.toggleNotification(true);
                    this.notificationService.changeMessage(`Echec lors de la récupération des événements ${err}`, 'danger');
                }
            });
    }

    getAvailabilityTag(event: EventDTO): string {
        if (event.remainingCapacity <= Math.floor(event.capacity * 0.25))
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

    selectEventForReservation(eventDTO: EventDTO) {
        this.selectedEvent = eventDTO;
    }


    cancelEventForReservation() {
        this.selectedEvent = undefined;
    }

    createReservation() {
        const event = this.selectedEvent as EventDTO;

        if (this.reservationForm.valid) {
            const nbrPerson = this.reservationForm.get("numberOfPeople")?.value as number;
            this.homeService.createReservation((this.userService.getUserInfo as UserDTO).id, (event.id as number),  nbrPerson).pipe(first())
                .subscribe({
                    next: (response) => {
                        console.log(response);
                        if (response.status === 200 && response.data.status === 'CONFIRMED') {
                            this.notificationService.toggleNotification(true);
                            this.notificationService.changeMessage(`Réservation confirmée !`, 'success');
                            this.loadListEvent();
                        } else {
                            this.notificationService.toggleNotification(true);
                            this.notificationService.changeMessage(`Echec lors de la création de la réservation <${response.message}>`, 'danger');
                        }
                    },
                    error: err => {
                        this.notificationService.toggleNotification(true);
                        this.notificationService.changeMessage(`Echec lors de la création de la réservation <${err}>`, 'danger');
                    }
                });
        }

    }

    get reservationDate() {
        return this.reservationForm.get('reservationDate');
    }

    get numberOfPeople() {
        return this.reservationForm.get('numberOfPeople');
    }

    protected readonly Math = Math;
}
