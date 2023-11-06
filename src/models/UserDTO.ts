import Gender from "../utils/Gender";

class UserDTO {
    id : number;
    username: string;
    password: string;
    email: string;
    fullName: string;
    gender: Gender;
    birthdate: string;
    country: string;

    constructor(id:number, username: string, password: string, email: string, fullName: string, gender: Gender, birthdate: string, country: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.fullName = fullName;
        this.gender = gender;
        this.birthdate = birthdate;
        this.country = country;
    }
}

export default UserDTO;
