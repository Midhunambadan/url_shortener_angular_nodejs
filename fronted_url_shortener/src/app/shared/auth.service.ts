import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userData: any = null
  constructor(private http:HttpClient,private router:Router) { }

  signupUser(userData:any):Observable<any>{
    return this.http.post(`${environment.apiUrl}/signup`,userData)
  }

    
  userLogin(loginData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/login`, loginData, {
      withCredentials: true  
    });
  }
  

  userLogout(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/logout`, {}, {
      withCredentials: true
    });
  }
  

  // isLogin(){
  //   return !!localStorage.getItem('token ')
  // }

  
 

    getToken(): string | null {
      return document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1] || null;
    }
    
    isLoggedIn(): boolean {
      return !!this.getToken()
    }
    

  // getToken(): string | null {
  //   const name = 'token=';
  //   const decodedCookie = decodeURIComponent(document.cookie);
  //   const ca = decodedCookie.split(';');
  //   for (let c of ca) {
  //     while (c.charAt(0) === ' ') {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) === 0) {
  //       return c.substring(name.length, c.length);
  //     }
  //   }
  //   return null;
  // }
  
  
  setUserData(data:any){
    this.userData=data
  }

  getUserData(){
    return this.userData
  }


  getUserProfile() {
    return this.http.get<{ data: any }>(`${environment.apiUrl}/profile`, {
      withCredentials: true  
    });    
  }
  

  clearUserData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.userData = null
  }
  

}


