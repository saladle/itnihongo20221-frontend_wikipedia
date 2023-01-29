import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export enum Role {
  Admin = 0,
  User = 1,
  Guess = 2,
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login_success: boolean = false;
  role: Role | any;
  usersList: any[] = [];
  currentUser: any;

  constructor(private router: Router) {
    if (localStorage.getItem('currentUser') != null) {
      this.login_success = true;
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
      this.role = this.currentUser.role;
    }
    this.usersList = [
      {
        username: 'admin',
        password: 'admin',
        role: Role.Admin,
        name: 'Admin',
      },
      {
        username: 'user',
        password: 'user',
        role: Role.User,
        name: 'User',
      },
      {
        username: 'guess',
        password: 'guess',
        role: Role.Guess,
        name: 'Guess',
      },
    ];
  }

  login(log_username: string, log_password: string) {
    this.usersList.forEach((element) => {
      if (element.username === log_username) {
        if (element.password === log_password) {
          this.login_success = true;
          this.role = element.role;
          this.currentUser = element;
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        } else {
          this.login_success = false;
        }
        this.router.navigate(['/home']);
      }
    });
  }

  logout() {
    this.router.navigate(['']);
    this.login_success = false;
  }

  isAuthenticated() {
    return this.login_success;
  }

}
