import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  fullTextSearch: string = '';
  barSwitch: boolean = true;
  listAllPost: Post[] = [];
  currentPost!: Post;
  currentUser: any;

  constructor(
    private authService: AuthService,
    private postsService: PostsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    this.getAllPost();
    this.getCurrentUser();
    await this.getCurrentPost(this.activatedRoute.snapshot.params.id);
  }

  async getAllPost() {
    await this.postsService
      .getAllPost()
      .toPromise()
      .then((response) => {
        this.listAllPost = response;
      });
  }

  async getCurrentPost(id: any) {
    await this.postsService.getPostById(id).toPromise().then((response) => {
      this.currentPost = response;
    })
  }

  async onClickDetailPost(id: any) {
    var link = `/post/${id.toString()}`
    this.router.navigate([link]);
    await this.getCurrentPost(id);
  }

  getCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentWikipediaUser')!);
  }

  onClickEditPost() {
    var link = `/edit/${this.currentPost.id.toString()}`
    this.router.navigate([link]);
  }

  nzOnSearch() {}
  onCancelSearch() {}

  onClickLogOut() {
    this.authService.logout();
  }

}
