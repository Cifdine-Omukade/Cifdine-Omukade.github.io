import { AuthService } from './auth-service';
import { NgModule }       from '@angular/core';
import { RouterModule }   from '@angular/router';
import { LoginComponent } from './login/login.component';
  
@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'login', component: LoginComponent }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthService
  ]
})
export class LoginRoutingModule {}