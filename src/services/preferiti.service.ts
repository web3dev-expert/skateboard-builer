import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../core/environment";

@Injectable({
    providedIn: 'root'
})
export class PreferitiServive {
    private preferito: string = '/preferito';
    private user: string = '/user';

    constructor(private http: HttpClient) { }

    getPreferiti(userId: number, page: number, size: number, orderBy: string, sortOrder: string, nomeGioco: string, difficoltaGioco: string) {
        return this.http.get(environment.API_URL + this.preferito + this.user + `/ ${userId}`);
    }
    deletePreferito(preferitoId: number) {
        return this.http.delete(environment.API_URL + this.preferito + `/ ${preferitoId}`);
    }
}