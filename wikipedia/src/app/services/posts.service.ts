import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  // baseUrl = 'http://localhost:3000/post';
  baseUrl = environment.postBaseUrl;
  constructor(private http: HttpClient) {}

  getAllPost() {
    return this.http.get<Post[]>(this.baseUrl);
  }

  getPostById(id: any) {
    return this.http.get<Post>(`${this.baseUrl}/${id}`);
  }

  postNewPost(data: any) {
    return this.http.post<Post>(this.baseUrl, data);
  }

  updatePost(id: any,data: any) {
    return this.http.put<Post>(`${this.baseUrl}/${id}`, data);
  }

}
