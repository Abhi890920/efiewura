import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'signin-signup',
    loadChildren: () => import('./pages/user/signin-signup/signin-signup.module').then( m => m.SigninSignupPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/user/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'profile-edit',
    loadChildren: () => import('./pages/user/profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/property/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/property/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'add',
    loadChildren: () => import('./pages/property/add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'login-modal',
    loadChildren: () => import('./modals/login-modal/login-modal.module').then( m => m.LoginModalPageModule)
  },
  {
    path: 'verification',
    loadChildren: () => import('./pages/user/verification/verification.module').then( m => m.VerificationPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./pages/messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./pages/property/category/category.module').then( m => m.CategoryPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
