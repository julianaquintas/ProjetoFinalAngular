import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { UserModel } from '../models/UserModel';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class UserServices {

  private loggedIn = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.loggedIn.asObservable();

  login() {
    this.loggedIn.next(true);
  }

  logout() {
    this.loggedIn.next(false);
  }
  
  public async getUsers(): Promise<UserModel[]> {
    try {
      const response = await fetch(environment.apiUrl + "/users");
      const _users: UserModel[] = await response.json();
      return _users;
    } catch (err) {
      console.log("Could not load subjects!", err);
      return [];
    }
  }
}