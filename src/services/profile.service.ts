import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../core/environment";

@Injectable({
    providedIn: 'root'
})
export class ProfileServive {

    private recensione: string = '/recensione';
    private gioco: string = '/gioco';
    private user: string = '/user';
    private userId: string = '/userId';
    private receId: string = '/receId';
    private richiesta: string = '/richiesta';
    private byParams: string = '/byParams';

    constructor(private http: HttpClient) { }

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
        return this.http.put(environment.API_URL + this.richiesta + `/${richiestaId}`, richiesta);
    }

    deletRichiesta(richiestaId: number) {
        return this.http.delete(environment.API_URL + this.richiesta + `/${richiestaId}`);
    }

    getRichiesteByUserId(userId: number,) {
        return this.http.get(environment.API_URL + this.richiesta + this.userId + `/${userId}`);
    }

    getRichiesteByFilters(userId: number, oggetto: string, descrizione: string, from: string, to: string, page: number, size: number, sort: string, sortOrder: string) {
        let params: HttpParams = new HttpParams();
        params = params.set('userId', userId);
        params = params.set('page', page);
        params = params.set('size', size);
        params = params.set('sort', sort + ',' + sortOrder);
        if (oggetto) params = params.set('oggetto', oggetto);
        if (descrizione) params = params.set('descrizione', descrizione);
        if (from) params = params.set('from', from);
        if (to) params = params.set('to', to);

        return this.http.get(environment.API_URL + this.richiesta + this.byParams , {params:params});
    }

    putUser(user:any, userId:number){
        return this.http.put(environment.API_URL+this.user+`/${userId}`,user);
    }
}