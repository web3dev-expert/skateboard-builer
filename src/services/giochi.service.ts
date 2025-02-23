import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../core/environment";

@Injectable({
    providedIn:'root'
})
export class GiochiService{

    private gioco:string = '/gioco'
constructor(private http:HttpClient){}

getGiochi(isActive?:boolean){
    return this.http.get(environment.API_URL+this.gioco+`?isActive=${isActive||true}`);
}
};