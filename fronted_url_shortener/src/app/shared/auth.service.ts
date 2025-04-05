import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userData: any = null
  private apiUrl = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  signupUser(userData:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/signup`,userData)
  }


  userLogout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, {
      withCredentials: true
    });
  }
  
  
  userLogin(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData, {
      withCredentials: true  
    });
  }
  

  setUserData(data:any){
    this.userData=data
  }

  getUserData(){
    return this.userData
  }


  getUserProfile() {
    return this.http.get<{ data: any }>(`${this.apiUrl}/profile`, {
      withCredentials: true  
    });    
  }
  

  clearUserData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.userData = null
  }
  

}


