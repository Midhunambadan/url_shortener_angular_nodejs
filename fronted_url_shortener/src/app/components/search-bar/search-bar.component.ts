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
  constructor(private UrlService: UrlService,private http:HttpClient){}
  inputUrl: string = ''
  dataBackend:any

  submitUrl() {
    if(!this.inputUrl.trim()){
      alert('Please Enter valid URL')
      return 
    }
     this.UrlService.submitUrl(this.inputUrl).subscribe()
    this.inputUrl=''
  }

  
}
