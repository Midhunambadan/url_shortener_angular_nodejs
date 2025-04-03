import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent,CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email:string=''
  name:string=''
  password:string=''
  isLogin = true

  constructor(private AuthService:AuthService){}
  toggleForm() {
    this.isLogin = !this.isLogin
  }

  register(){
    if(!this.email || !this.name||!this.password ){
      alert('Please enter details')
    }

    let userData={
      email:this.email,
      name:this.name,
      password:this.password
    }
    alert('register work'+userData.email)

    this.AuthService.signupUser(userData).subscribe((res:any)=>{
      alert(res.message)
      this.isLogin=true
    },
    (error)=>{
      console.error('Registration Failed',error)
      alert('Failed to register user'+error.message)
    }
  )
    
  }

  login(){}

}
