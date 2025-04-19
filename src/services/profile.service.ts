import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../core/environment";
import { DatePipe } from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class ProfileServive {

    private recensione: string = '/recensione';
    private gioco: string = '/gioco';
    private userId: string = '/userId';
    private receId: string = '/receId';
    private richiesta: string = '/richiesta';

    constructor(private http: HttpClient, private datePipe: DatePipe) { }

    getRecensioniByUserId(userId: number, page: number, size: number, orderBy: string, sortOrder: string) {
        return this.http.get(environment.API_URL + this.recensione + `?id=${userId}&page=${page}&size=${size}&orderBy=${orderBy}&sortOrder=${sortOrder}`);
    }

    getGiochiByUserId(userId: number, page: number, size: number, orderBy: string, sortOrder: string) {
        return this.http.get(environment.API_URL + this.gioco + this.userId + `?id=${userId}&page=${page}&size=${size}&orderBy=${orderBy}&sortOrder=${sortOrder}`);
    }

    getGiocoByReceId(receId: number) {
        return this.http.get(environment.API_URL + this.gioco + this.receId + `?id=${receId}`);
    }

    getTrofeiByUserId(userId: number, page: number, size: number, orderBy: string, sortOrder: string) {
        return this.http.get(environment.API_URL + this.recensione + `?id=${userId}&page=${page}&size=${size}&orderBy=${orderBy}&sortOrder=${sortOrder}`);
    }

    getPunteggiByUserId(userId: number, page: number, size: number, orderBy: string, sortOrder: string) {
        return this.http.get(environment.API_URL + this.recensione + `?id=${userId}&page=${page}&size=${size}&orderBy=${orderBy}&sortOrder=${sortOrder}`);
    }

    postRichiestaAssistenza(richiesta: any) {
        return this.http.post(environment.API_URL + this.richiesta, richiesta);
    }

    putRichiesta(richiesta: any, richiestaId: number) {
        return this.http.post(environment.API_URL + this.richiesta + `/${richiestaId}`, richiesta);
    }

    deletRichiesta(richiestaId: number) {
        return this.http.delete(environment.API_URL + this.richiesta + `/${richiestaId}`);
    }

    getRichiesteByUserId(userId: number,) {
        return this.http.get(environment.API_URL + this.richiesta + this.userId + `/${userId}`);
    }

    getRichiesteByFilters(userId: number, oggetto: string, descrizione: string, from: Date, to: Date) {
        return this.http.get(environment.API_URL + this.richiesta + `?userId=${userId}&descrizione=${descrizione}&oggetto=${oggetto}&from=${this.datePipe.transform(from, "yyyy-MM-dd")}&to=${this.datePipe.transform(from, "yyyy-MM-dd")}`);
    }
}