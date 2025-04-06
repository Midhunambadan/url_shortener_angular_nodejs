import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent,
    CommonModule,
    FormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  email:string=''
  name:string=''
  password:string=''
  isLogin = true

  constructor(private AuthService:AuthService,private router:Router){}


  ngOnInit(): void {
    // const token = this.AuthService.getToken()
    // if (token) {
    //   this.router.navigate(['/home']);
    // }
  }

  toggleForm() {
    this.isLogin = !this.isLogin
  }

  register(){
    if(!this.email || !this.name||!this.password ){
      alert('Please enter details')
      return
    }

    let userData={
      email:this.email,
      name:this.name,
      password:this.password
    }

    this.AuthService.signupUser(userData).subscribe((res:any)=>{
      alert(res.message)
      userData.email=''
      userData.name=''
      userData.password=''
      this.isLogin=true
    },
    (error)=>{
      console.error('Registration Failed',error)
      alert('Failed to register user: ' + (error.error?.message || error.message));
    })
    }



  login(){
    if(!this.email ||!this.password ){
      alert('Please enter Username and Password')
    }

    let loginData={
      email:this.email,
      password:this.password
    }
    this.AuthService.userLogin(loginData).subscribe((res:any)=>{
      const token=res.token
      // console.log('token-------',token)
      
      if (token) {
        const expires = new Date();
        expires.setDate(expires.getDate() + 7)
        document.cookie = `token=${token}; expires=${expires.toUTCString()}; path=/; secure`;
      }

      this.AuthService.setUserData(res.data)
      this.router.navigate(['/profile'])
      this.isLogin=true
    },
    (error)=>{
      alert(error.error.message ||'Failed to login user')

    })}




}
