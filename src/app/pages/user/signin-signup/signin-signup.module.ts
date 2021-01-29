import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SigninSignupPageRoutingModule } from './signin-signup-routing.module';

import { SigninSignupPage } from './signin-signup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SigninSignupPageRoutingModule
  ],
  declarations: [SigninSignupPage]
})
export class SigninSignupPageModule {}
