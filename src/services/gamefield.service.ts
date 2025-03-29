import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../core/environment';

@Injectable({
  providedIn: 'root'
})
export class GamefieldService {

  private partita: string = '/partita';
  private byUser: string = '/user';
  private byGioco: string = '/gioco';
  private byUserAndDate: string = '/userAndDate';
  private byUserAndGioco: string = '/userAndGioco';


  constructor(private http: HttpClient) { }

  postPartite(partita: {}[]) {
    return this.http.post(environment.API_URL + this.partita, partita)
  }

  getPartitaByUser(userId: number) {
    return this.http.get(environment.API_URL + this.partita + this.byUser + `/${userId}`)
  }

  getPartitaByGioco(giocoId: number) {
    return this.http.get(environment.API_URL + this.partita + this.byGioco + `/${giocoId}`)
  }

  getPartitaByUserAndDate(userId: number, from: string, to: string) {
    return this.http.get(environment.API_URL + this.byUserAndDate + `/${userId}?from=${from}&to=${to}`)
  }

  getPartitaByUserAndGioco(userId: number, giocoId: number) {
    return this.http.get(environment.API_URL + this.partita + this.byUserAndGioco + `/${userId}/${giocoId}`)
  }
}
