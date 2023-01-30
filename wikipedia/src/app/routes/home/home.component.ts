import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fullTextSearch: string = '';
  barSwitch: boolean = true;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  nzOnSearch(){}
  onCancelSearch(){}

  onClickLogOut() {
    console.log('huy');
    this.authService.logout();
  }

}
