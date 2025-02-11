import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreatePostsComponent } from './auth/home-index/create-posts/create-posts.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { CanActivateUser, userResolve } from './services/Authguard/authguard.service';
import { CanActivateUserOpposite } from './services/Authguard/authguard_opposite.service';
import { Error404Component } from './shared/components/error404/error404.component';



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
            path: 'create-a-post',
            loadComponent: () => import('./auth/home-index/create-posts/create-posts.component').then(m => m.CreatePostsComponent),
            canActivate: [CanActivateUser]
          },
          {
            path: '',
            loadComponent: () => import('./user/posts-main/posts-main.component').then(m => m.PostsMainComponent),
            resolve: { user: userResolve }
          },
          {
            path: 'user/:usernameID',
            loadComponent: () => import('./user/user-profile/user-profile.component').then(m => m.UserProfileComponent),
            canActivate: [CanActivateUser]
          },
          {
            path: 'music',
            loadComponent: () => import('./music/music/music.component').then(m => m.MusicComponent)
          }
        ]
      }
    ]
  },
  {
    path: '**',
    component: Error404Component
  }
];
