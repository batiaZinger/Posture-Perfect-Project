import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {

  loginName:string; //  Instead of being written login will be written the user name
  userNameMail:string;

  user: string;

  constructor(private router: Router,private httpClient:HttpClient) { 
 
  }

  login(user) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigateByUrl('');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.user && state.url.includes('login')) {
      this.router.navigateByUrl('/');
      return false;
    } else if(!this.user && !state.url.includes('login')) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }

  getAllVideos(){
    return this.httpClient.get('http://127.0.0.1:5000/videos/filter/', {
      params: {
        mail: this.userNameMail
      },
      observe: 'response'
    })
  }

  

}
