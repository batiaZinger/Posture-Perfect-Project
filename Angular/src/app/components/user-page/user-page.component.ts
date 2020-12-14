import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { AddUserService } from 'src/app/services/add-user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  constructor(private addUserService: AddUserService) { }

  study: boolean = false;
  userName: string;

  openDiv() {
    this.study = !this.study
  }
  
  ngOnInit() {
    this.userName = this.addUserService.userName;

  }

}
