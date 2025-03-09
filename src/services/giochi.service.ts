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



searchGiochi(body:{nome:string,difficolta:number,punteggio:number},page:number,size:number,orderBy:string,sortOrderd:string,isActive?:boolean){
    return this.http.get(environment.API_URL + this.gioco + this.byFilters + 
        `?nomeGioco=${body?.nome||""}&difficolta=${body?.difficolta||0}&avg=${body?.punteggio||0}&page=${page}&size=${size}&orderBy=${orderBy}&sortOrder=${sortOrderd}&isActive=${isActive}`);
}
};