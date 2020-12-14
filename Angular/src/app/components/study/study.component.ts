import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { style } from '@angular/animations';


@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnInit {

  show:boolean=false

  constructor() { }

  @HostListener("window:scroll", []) onWindowScroll() {
    this.scrollFunction();
  }

  scrollFunction() {
    if (document.body.scrollTop > 140 || document.documentElement.scrollTop > 140) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
  }
  

// When the user clicks on the button, scroll to the top of the document
topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 

showqu(){
//  this.show=true
 style:['#question{display:none}']

}

showShortDesciption = true

 alterDescriptionText() {
   
    this.showShortDesciption = !this.showShortDesciption
 }
 
  ngOnInit() {
  }

}
