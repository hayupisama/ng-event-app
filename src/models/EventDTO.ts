export class EventDTO {
    id: number | null;
    name: string;
    address: string;
    startDate: string;
    endDate: string;
    description: string;
    organizer: string;
    capacity: number;
    price: number;
    soldPrice: number;
    inSold: boolean;
    rating: number;
    image: string;
    remainingCapacity: number;

    constructor(
        id: number | null,
        name: string,
        address: string,
        startDate: string,
        endDate: string,
        description: string,
        organizer: string,
        capacity: number,
        price: number,
        soldPrice: number,
        inSold: boolean,
        rating: number,
        image: string,
        remainingCapacity: number
    ) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.organizer = organizer;
        this.capacity = capacity;
        this.price = price;
        this.soldPrice = soldPrice;
        this.inSold = inSold;
        this.rating = rating;
        this.image = image;
        this.remainingCapacity = remainingCapacity;
    }


}
