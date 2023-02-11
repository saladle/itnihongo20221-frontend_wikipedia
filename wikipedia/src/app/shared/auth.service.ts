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
  guessUser = {
    username: 'guess',
    password: 'guess',
    role: Role.Guess,
    name: 'Guess',
  };

  constructor(private router: Router) {
    if (localStorage.getItem('currentWikipediaUser') != null) {
      this.login_success = true;
      this.currentUser = JSON.parse(localStorage.getItem('currentWikipediaUser')!);
      this.role = this.currentUser.role;
    }
    this.usersList = [
      {
        id: '0001',
        username: 'admin',
        password: 'admin',
        role: Role.Admin,
        name: 'Admin',
      },
      {
        id: '0002',
        username: 'user',
        password: 'user',
        role: Role.User,
        name: 'User',
      },
      {
        id: '0003',
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
          localStorage.setItem('currentWikipediaUser', JSON.stringify(this.currentUser));
        } else {
          this.login_success = false;
        }
        this.router.navigate(['/home']);
      }
    });
  }

  logout() {
    this.router.navigate(['login']);
    this.login_success = false;
    localStorage.setItem('currentWikipediaUser', JSON.stringify(this.guessUser));
  }

  isAuthenticated() {
    return this.login_success;
  }

}
