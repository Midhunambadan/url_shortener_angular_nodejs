import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

  userData:any=''

  constructor(private AuthService:AuthService ){}

 
  ngOnInit(): void {
    this.AuthService.getUserProfile().subscribe({
      next: (res:any) => {
        this.userData = res.data
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      }
    });
  }


}
