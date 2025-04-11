import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UrlService } from '../../shared/url.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule,
            HttpClientModule,
            CommonModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent  implements OnInit{
  constructor(private UrlService: UrlService,private http:HttpClient){}
  inputUrl: string = ''
  dataBackend:any

  ngOnInit(): void {
    this.UrlService.backendData$.subscribe((data) => {
      console.log('data------',data)
      this.dataBackend = data
    })
  }
  submitUrl() {
    if(!this.inputUrl.trim()){
      alert('Please Enter valid URL')
      return 
    }
     this.UrlService.submitUrl(this.inputUrl).subscribe()
    this.inputUrl=''
  }

  
}
