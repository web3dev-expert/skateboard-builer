import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../core/environment";

@Injectable({
    providedIn:'root'
})
export class GiochiService{

    private gioco:string = '/gioco'
constructor(private http:HttpClient){}

getGiochi(){
    return this.http.get(environment.API_URL+this.gioco);
}
};