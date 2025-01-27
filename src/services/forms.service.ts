import { Injectable } from "@angular/core";
import { LoginUser, SignupUser } from "../interfaces/interfaces";
import { HttpClient } from "@angular/common/http";
import { environment } from "../core/environment";

@Injectable({
    providedIn: 'root'
  })
export class FormsService{


    private login:string ='/login';
    private signup:string ='/signup';

    constructor(private http:HttpClient){
    }

    logIn(body:LoginUser){
    return this.http.post(environment.API_URL+this.login,body);
    }

    signUp(body:SignupUser){
        return '';
        }
}