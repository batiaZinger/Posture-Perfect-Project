import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
import { AddUserService } from 'src/app/services/add-user.service';
import { state } from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  // get primEmail(){
  //   return this.userEmails.get('primaryEmail')
  //   }
  
  //   get secondEmail(){
  //   return this.userEmails.get('secondaryEmail')
  //   }
  
  //   title = 'email-validation-tutorial';
  //   userEmails = new FormGroup({
  //   primaryEmail: new FormControl('',[
  //     Validators.required,
  //     Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
  //   });  
characters:boolean=false;

  userObject

  constructor( private  router:Router,private httpClient:HttpClient,private addUserService:AddUserService) { }

  ngOnInit() {
  }


  addUser(mail,name,password){
    this.userObject={'mail' : mail,
                     'name' : name,
                     'password' : password
                    }
     const userJson=<JSON> this.userObject
    debugger;

    this.addUserService.postUser(userJson).subscribe(data => {
      console.log(" User successfully added")
    }, error => {
      console.log(error);
    });    
    

    this.addUserService.userName = name;
    debugger;
    this.addUserService.userPassword = password;

    this.router.navigate(['/login']);
  
  }
}



