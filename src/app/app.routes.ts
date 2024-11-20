import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreatePostsComponent } from './auth/home-index/create-posts/create-posts.component';
import { AllUsersPostsComponent } from './user/all-users-posts/all-users-posts.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
      },
      {
        path: '',
        loadComponent: () => import('./auth/home-index/home-index.component').then(m => m.HomeIndexComponent),
        children: [
          {
            path:'create-a-post',
            component: CreatePostsComponent
          },
          {
            path:'',
            component: AllUsersPostsComponent
          }
        ]
      }
    ]
  }
];
