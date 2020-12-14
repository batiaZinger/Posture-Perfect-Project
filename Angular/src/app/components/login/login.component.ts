import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AddUserService } from 'src/app/services/add-user.service';
import { HttpClient } from '@angular/common/http';
import { HomeComponent } from '../home/home.component';
import { FileUploadService} from 'src/app/services/file-upload.service'
import { from } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public show: boolean =false;
  userName:string;
  userPassword:string;
  userMail:string;
  userData:JSON
  message:string;
  a:string;

  constructor(private fileUploadService :FileUploadService ,private userService: UserService, private  router:Router,private addUserService:AddUserService,private httpClient:HttpClient) {
   }

  login() {
    this.userService.login(this.userPassword);
    this.getAllUsers();
  }

  ngOnInit() {
    this.userName = this.addUserService.userName;
    this.userPassword=this.addUserService.userPassword;
    this.message=this.addUserService.userMessage,
    this.a=this.message;
    this.addUserService.userName = undefined;
    this.addUserService.userPassword = undefined;
    this.addUserService.userMessage=undefined;
  }


  getAllUsers() {
    debugger;
    this.httpClient.get('http://127.0.0.1:5000/users/all').subscribe(data => {
      this.userData = data as JSON;
      let users = [];
      for(let key in this.userData) {
        let index = parseInt(key.replace( /^\D+/g, ''));
              users.push(this.userData[key])
      }
      
      let flag=1;
      for(let key in users[0]){
        if (this.userName==users[0][key][1] && this.userPassword==users[0][key][2]){
          flag=0;
          console.log("find")
          HomeComponent.prototype.loginName=this.userName
          this.userService.loginName=this.userName
          this.addUserService.userName=this.userName
          this.userMail=users[0][key][0]
          this.fileUploadService.userMail=this.userMail
          this.userService.userNameMail=this.userMail

          console.log("userMail "+users[0][key][0])
          this.router.navigateByUrl('/userPage')
          break;
        }
      }

      if (flag==1){
        console.log("dont find")
        this.message ="user name or password not correct"
        this.addUserService.userMessage=this.message;
        this.router.navigateByUrl('/login')

      }
    })
  }
}
