import { Component, OnInit, HostListener } from '@angular/core';
import { style } from '@angular/animations';
import { StudyService } from 'src/app/services/study.service';
import { Key } from 'protractor';
import { Router, ActivatedRoute } from '@angular/router';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { FileUploadService } from 'src/app/services/file-upload.service';



@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss']
})
export class LectureComponent implements OnInit {


  english:boolean=true;
  hebrew:boolean=false;

  show: boolean = false
  lessonId;
  statusId;
  userMail;
  object;
  userObject: { mail: any; name: never; password: any; };
  arr;
  serverData: Object;
  entries: any;

  constructor(private _scrollToService: ScrollToService, private fileUploadService: FileUploadService, private studyService: StudyService, private activatedRoute:ActivatedRoute) { }


  getChatMessages(id){
    const config: ScrollToConfigOptions = {
      target: id
    };
    this._scrollToService.scrollTo(config);
  }


  //insert/update in the data base where is the user in the lessons
  radioButtonChanged(lessonId, statusId) {
    this.lessonId = lessonId;
    this.statusId = statusId;
    this.userMail = this.fileUploadService.userMail
    const subjectId = 2;
    this.object = {
      'userMail': this.userMail,
      'lessonId': lessonId,
      'statusId': statusId,
      'subjectId': subjectId
    }
    debugger;
    const userJson = <JSON>this.object
    this.studyService.PostUserAndLesson(userJson).subscribe(data => {
      console.log(" User and lesson successfully added / updated")
    }, error => {
      console.log(error);
    });
  }

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
  English(){
    this.english=true;
    this.hebrew=false;
    
  }
  Hebrew(){
    this.hebrew=true;
    this.english=false;
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
    this.activatedRoute.params.subscribe(param => {
      console.log(param)
    })

    this.userMail = this.fileUploadService.userMail
    this.entries = {};
    this.studyService.GetUserAndLesson(this.userMail, 2).subscribe(data => {
      //split the json object to array
      this.serverData = data.body['result'];
      this.serverData = this.serverData;

      for (let key in this.serverData) {
        let index = parseInt(key.replace(/^\D+/g, ''));
        this.entries[this.serverData[key][1]] = this.serverData[key];
      }

      for (let index = 15; index < 26; index++) {
        if (!this.entries[index])
          this.entries[index] = [this.userMail, index, null, 2];
      }
      console.log(this.entries)
    })
  }


}


