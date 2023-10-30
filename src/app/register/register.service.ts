import { Injectable } from '@angular/core';
import {HttpClientService} from "../http-client.service";
import Gender from "../../utils/Gender";
import UserDTO from "../../models/UserDTO";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClientService) {
  }

  register(username: string, password: string, email: string, fullName: string, gender: Gender, birthdate: string, country: string){
    const userDTO = new UserDTO(username, password, email, fullName, gender, birthdate, country);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(`/users/register`, userDTO, httpOptions);
  }
}
