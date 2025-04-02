import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UrlService } from '../../shared/url.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule,
            HttpClientModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  constructor(private UrlService: UrlService,
              private http:HttpClient
  ) {}

  inputUrl: string = ''
  submitUrl() {
    if(!this.inputUrl.trim()){
      alert('Please Enter valid URL')
      return 
    }
    alert('Submitted URL: ' + this.inputUrl)
     this.http.get('http://localhost:3000').subscribe((res)=>{
      this.inputUrl='heello'
    })
  }

  
}
