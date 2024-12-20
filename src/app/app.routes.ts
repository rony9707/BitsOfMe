import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreatePostsComponent } from './auth/home-index/create-posts/create-posts.component';
import { AllUsersPostsComponent } from './user/all-users-posts/all-users-posts.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { CanActivateUser, userResolve } from './services/Authguard/authguard.service';
import { AuthGuardService_opposite } from './services/Authguard/authguard_opposite.service';



export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
        canActivate:[AuthGuardService_opposite]
      },
      {
        path: 'register',
        loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent),
        canActivate:[AuthGuardService_opposite]
      },
      {
        path: '',
        loadComponent: () => import('./auth/home-index/home-index.component').then(m => m.HomeIndexComponent),
        children: [
          {
            path:'create-a-post',
            component: CreatePostsComponent,
            canActivate: [CanActivateUser]
          },
          {
            path:'',
            component: AllUsersPostsComponent
          },
          {
            path:'user/:usernameID',
            component: UserProfileComponent,
            canActivate: [CanActivateUser]
          }
        ]
      }
    ]
  }

];
