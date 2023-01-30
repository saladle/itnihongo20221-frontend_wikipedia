import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  log_email: string = '';
  log_pw: string = '';
  userList: any;
  currentUser: any;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    // this.getAllUsers();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  // async getAllUsers() {
  //   var res = await this.userService.getAllUsers().toPromise;
  //   this.userList = res;
  // }

  login(){
    this.authService.login(this.log_email, this.log_pw);
    // Object.keys(this.userList).forEach((element) => {
    //   if (this.userList[element].userName === this.log_email) {
    //     if (this.userList[element].password === this.log_pw) {
    //       this.currentUser = this.userList[element];
    //       this.authService.setCurrentUser(this.currentUser);
    //     }
    //   }
    // })
  }

  continueAsGuest() {
    this.authService.login('guess', 'guess');

  }

}
