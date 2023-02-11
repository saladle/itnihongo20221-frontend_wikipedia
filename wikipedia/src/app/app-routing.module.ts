import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AddNewConceptComponent } from './routes/add-new-concept/add-new-concept.component';
import { HomeComponent } from './routes/home/home.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { PostComponent } from './routes/post/post.component';
import { AuthGuard } from './shared/auth.guard';
import { Role } from './shared/auth.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'post/:id', component: PostComponent, canActivate: [AuthGuard] },
  {
    path: 'add',
    component: AddNewConceptComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.User] },
  },
  {
    path: 'edit/:id',
    component: AddNewConceptComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.User] },
  },
  { path: '**', component: NotFoundComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
