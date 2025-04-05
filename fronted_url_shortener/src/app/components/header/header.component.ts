import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userData: any=''

  constructor(private AuthService:AuthService,private router:Router){}

  ngOnInit(): void {
    this.userData=this.AuthService.getUserData()
  }

  
  userLogout(){
    this.AuthService.userLogout().subscribe({
      next: (res) => {
        console.log('Logout Success');
        this.AuthService.clearUserData()
        
        this.userData = null
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed', err);
      }
    });
    
  }


}
