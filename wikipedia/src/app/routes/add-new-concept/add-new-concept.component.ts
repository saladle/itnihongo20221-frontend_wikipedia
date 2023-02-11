import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-add-new-concept',
  templateUrl: './add-new-concept.component.html',
  styleUrls: ['./add-new-concept.component.css']
})
export class AddNewConceptComponent implements OnInit {
  isCollapsed = false;
  today = new Date();
  title: string = '';
  isPublic: boolean = true;
  createForm!: FormGroup;
  lastPostedPost!: Post;
  currentPost!: Post;
  isEditing: boolean = false;
  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    // private message: NzMessageService,
    private notification: NzNotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    this.initForm();
    var id = this.activatedRoute.snapshot.params.id;
    if(id) {
      await this.getCurrentPost(id);
      this.createForm.patchValue(this.currentPost);
      this.isEditing = true;
    }
  }

  initForm() {
    this.createForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      references: [null],
      userId: [null, [Validators.required]],
      userName: [null],
      createdAt: [null],
      lastUpdatedAt: [null],
      topic: [null],
      isPublic: [true],
      like: [0],
      dislike: [0],
    })
  }

  async getCurrentPost(id: any) {
    await this.postsService.getPostById(id).toPromise().then((response) => {
      this.currentPost = response;
    })
  }

  listOfOption: string[] = ['Hán tự', 'Katakana', 'Hiragana', 'toàn'];
  listOfSelectedValue = [];


  async onClickPublish(template: TemplateRef<{}>) {
    this.createForm.get('references')?.setValue(this.listOfReferencesLink);
    this.createForm.get('createdAt')?.setValue(new Date());
    this.createForm.get('userName')?.setValue(JSON.parse(localStorage.getItem('currentWikipediaUser')!).name);
    this.createForm.get('userId')?.setValue(JSON.parse(localStorage.getItem('currentWikipediaUser')!).id);
    await this.postsService.postNewPost(this.createForm.value).toPromise().then((response)=>{
      // this.message.create('success', `Đăng bài viết thành công`);
      this.createBasicNotification(template);
      this.lastPostedPost = response;
    })
  }

  async onClickUpdate(template: TemplateRef<{}>) {
    this.createForm.get('lastUpdatedAt')?.setValue(new Date());
    await this.postsService.updatePost(this.createForm.value.id, this.createForm.value).toPromise().then((response)=>{
      this.createBasicNotification(template);
      this.lastPostedPost = response;
    })
  }

  // Tag
  listOfReferencesLink: string[] = [];
  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

  handleClose(removedTag: {}): void {
    this.listOfReferencesLink = this.listOfReferencesLink.filter(tag => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.listOfReferencesLink.indexOf(this.inputValue) === -1) {
      this.listOfReferencesLink = [...this.listOfReferencesLink, this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible = false;
  }

  // Notification
  createBasicNotification(template: TemplateRef<{}>): void {
    this.notification.template(template);
  }

  // See the post
  goToPost() {
    var link = `/post/${this.createForm.value.id.toString()}`
    this.router.navigate([link]);
  }
}
