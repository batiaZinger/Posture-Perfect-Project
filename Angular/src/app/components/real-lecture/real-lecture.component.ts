import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-real-lecture',
  templateUrl: './real-lecture.component.html',
  styleUrls: ['./real-lecture.component.scss']
})
export class RealLectureComponent implements OnInit {

  show:boolean=false;
  constructor() { }
  p:boolean=true;
popup;

  ngOnInit() {
  }


  toggleVideo(){
    this.show=true;
    this.p=false;

  }
  myFunction() {
    this.popup = document.getElementById("myPopup");
     this.popup.classList.toggle("show");
   }
}
