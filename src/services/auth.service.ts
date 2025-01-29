import { Injectable } from '@angular/core';
import { AuthGuard } from '../core/auth.guard';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticatedUser:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private token:string = '';
  private user!:User | null;
  constructor(private authGuard:AuthGuard) { }

  authenticateUser(bool:boolean){
    this.authGuard.isAuthenticated = bool;
    this.isAuthenticatedUser.next(bool);
  }
  getToken(){
    return this.token;
  }
  setToken(token:string){
    this.token=token;
  }
  getUser(){
    return this.user;
  }
  setUser(user:| null){
    this.user=user;
  }
}
