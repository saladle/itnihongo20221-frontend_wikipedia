import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private message: NzMessageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const expectedRole = route.data.roles;
    // return true if user role is not expectedRole
    // var notRole =
    //   expectedRole != undefined && this.authService.role != expectedRole;
    var notRole =
      (expectedRole != undefined) && (expectedRole.indexOf(this.authService.role) == -1);

    // Redirect to login page if the user is not authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    // Alarm when user is not granted to access the resource
    else if (notRole) {
      // alert('This function require Administration');
      this.message.warning('Bạn cần đăng nhập trước khi thêm bài viết')
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
