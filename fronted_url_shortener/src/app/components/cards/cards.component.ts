import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../shared/url.service';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit {
  backendData: any;

  constructor(private UrlService:UrlService){}

  ngOnInit(): void {
    this.UrlService.backendData$.subscribe((data)=>{
      this.backendData=data
    })
  }


}
