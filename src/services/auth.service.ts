import { Injectable } from '@angular/core';
import { AuthGuard } from '../core/auth.guard';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticatedUser:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private authGuard:AuthGuard) { }

  authenticateUser(bool:boolean){
    this.authGuard.isAuthenticated = bool;
    this.isAuthenticatedUser.next(bool);
  }
}
