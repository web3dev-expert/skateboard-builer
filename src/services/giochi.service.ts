import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../core/environment";

@Injectable({
    providedIn:'root'
})
export class GiochiService{

    private gioco:string = '/gioco'
    private byFilters:string = '/byFilters'

constructor(private http:HttpClient){}

getGiochi(isActive?:boolean){
    return this.http.get(environment.API_URL + this.gioco+`?isActive=${isActive||true}`);
}

searchGiochi(body:{nome:string,difficolta:number,punteggio:number}){
    return this.http.get(environment.API_URL + this.gioco + this.byFilters + `?nomeGioco=${body?.nome||""}&difficolta=${body?.difficolta||0}&avg=${body?.punteggio||1}`);
}
};