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
  private assignGiocoToUser: string = '/assignGiocoToUser';

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

  assignGiocoUser(giocoId: number, userId: number){
    return this.http.get(environment.API_URL + this.byGioco+this.assignGiocoToUser + `?gioco=${giocoId}&user=${userId}`)
  }

  getGiochiByUser(userId: number) {
    return this.http.get(environment.API_URL + this.byGioco + this.byUser + `Id`)
  }
}
