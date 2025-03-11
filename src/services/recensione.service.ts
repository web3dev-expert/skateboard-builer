import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../core/environment";

@Injectable({
    providedIn:'root'
})
export class RecensioneService {
private recensione:string = '/recensione';
private userAndGioco:string = '/userAndGioco';


constructor(private http:HttpClient){}

getRecensioneByUserIdAndGiocoId(giocoId:number){
    return this.http.get(environment.API_URL + this.recensione + this.userAndGioco + `?giocoId=${giocoId}`);
}

saveRecensione(recensione:any){
    return this.http.post(environment.API_URL + this.recensione, recensione);
}

putRecensione(recensione:any,recensioneId:number){
    return this.http.put(environment.API_URL + this.recensione + `/${recensioneId}`, recensione);
}

deleteRecensione(recensioneId:number){
    return this.http.delete(environment.API_URL + this.recensione + `/${recensioneId}`);
}

};