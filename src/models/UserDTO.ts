import Gender from "../utils/Gender";

class UserDTO {
    username: string;
    password: string;
    email: string;
    fullName: string;
    gender: Gender;
    birthdate: string;
    country: string;

    constructor(username: string, password: string, email: string, fullName: string, gender: Gender, birthdate: string, country: string) {
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
