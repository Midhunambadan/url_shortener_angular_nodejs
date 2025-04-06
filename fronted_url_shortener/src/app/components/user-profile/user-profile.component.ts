import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule,HeaderComponent,SearchBarComponent],
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
