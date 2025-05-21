import { HttpBackend, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../core/environment";

@Injectable({
    providedIn:'root'
})
export class EmojiService{

    private emojies:string = '/emojies';


constructor(private http:HttpClient){}

    getAllEmojies(){
        return this.http.get(environment.API_URL+this.emojies);
    }
    
}