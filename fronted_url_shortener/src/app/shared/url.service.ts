import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private api='http://localhost:3000'

  constructor(private http:HttpClient) { }

   private backendDataSubject = new BehaviorSubject<any>(null)
  backendData$ = this.backendDataSubject.asObservable()

  
  submitUrl(inputUrl: string): Observable<any> {
    return this.http.post<any>(
      `${this.api}/create`,
      { url: inputUrl },
      { withCredentials: true } 
    ).pipe(
      tap((res) => this.backendDataSubject.next(res.data))
    );
  }
  
  

}
