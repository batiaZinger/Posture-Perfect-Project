import { Component, OnInit } from '@angular/core';
import { UrlSerializer, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loginName:string;



  constructor( private  router:Router) { }

  ngOnInit() {

    this.router.navigateByUrl('/welcome')

  }

}
