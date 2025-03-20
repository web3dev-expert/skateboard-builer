import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../core/environment";

@Injectable({
    providedIn: 'root'
})
export class ProfileServive {

    private recensione: string = '/recensione';
    private gioco: string = '/gioco';
    private userId: string = '/userId'
    private receId: string = '/receId'

    constructor(private http: HttpClient) { }

    getRecensioniByUserId(userId: number, page: number, size: number, orderBy: string, sortOrder: string) {
        return this.http.get(environment.API_URL + this.recensione + `?id=${userId}&page=${page}&size=${size}&orderBy=${orderBy}&sortOrder=${sortOrder}`)
    }

    getGiochiByUserId(userId: number, page: number, size: number, orderBy: string, sortOrder: string) {
        return this.http.get(environment.API_URL + this.gioco + this.userId + `?id=${userId}&page=${page}&size=${size}&orderBy=${orderBy}&sortOrder=${sortOrder}`)
    }

    getGiocoByReceId(receId: number) {
        return this.http.get(environment.API_URL + this.gioco + this.receId + `?id=${receId}`)
    }

    getTrofeiByUserId(userId: number, page: number, size: number, orderBy: string, sortOrder: string) {
        return this.http.get(environment.API_URL + this.recensione + `?id=${userId}&page=${page}&size=${size}&orderBy=${orderBy}&sortOrder=${sortOrder}`)
    }

    getPunteggiByUserId(userId: number, page: number, size: number, orderBy: string, sortOrder: string) {
        return this.http.get(environment.API_URL + this.recensione + `?id=${userId}&page=${page}&size=${size}&orderBy=${orderBy}&sortOrder=${sortOrder}`)
    }
}