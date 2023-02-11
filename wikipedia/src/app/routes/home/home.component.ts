import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  fullTextSearch: string = '';
  barSwitch: boolean = true;
  listAllPost: Post[] = [];

  constructor(
    private authService: AuthService,
    private postsService: PostsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getAllPost();
  }

  async getAllPost() {
    await this.postsService
      .getAllPost()
      .toPromise()
      .then((response) => {
        this.listAllPost = response;
      });
  }

  onClickDetailPost(id: any) {
    var link = `/post/${id.toString()}`
    this.router.navigate([link]);
  }

  nzOnSearch() {}
  onCancelSearch() {}

  onClickLogOut() {
    this.authService.logout();
  }
}
