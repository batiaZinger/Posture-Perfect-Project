import { Component, OnInit } from '@angular/core';
import { AddUserService } from 'src/app/services/add-user.service';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit {

  userName:string
  arrQuestion:any;
  arrQuestionInterview:any;
  arrRecordInterview:any;
  arrAnswerInterview:any;
  index:InterviewComponent;
  talking:boolean;
  middle:string;
  continuei;
  popup;
  p:boolean=true;

  constructor(private addUserService: AddUserService) { 
    this.arrQuestion=[{txt:'why do you want to work for our company?', src:'assets/Records/question1.mp3'},{txt:'what qualities do you have relevant to this role?',src:'assets/Records/question2.mp3'},
    {txt:'what are your key strengths?',src:'assets/Records/question3.mp3'},{txt:'why do you want to leave your current job?',src:'assets/Records/question4.mp3'},
    {txt:'why should we choose you?',src:'assets/Records/question5.mp3'},{txt:'what motivates you?',src:'assets/Records/question6.mp3'},
    {txt:'what’s your biggest weakness?',src:'assets/Records/question7.mp3'},{txt:"what are your career plans for the next 5 to 10 years?",src:'assets/Records/question8.mp3'}];
    this.arrQuestionInterview=[];
    this.arrAnswerInterview=[];
  }
  myFunction() {
   this.popup = document.getElementById("myPopup");
    this.popup.classList.toggle("show");
  }
  ngOnInit() {
    this.userName = this.addUserService.userName;
  }

  startInterview(index){

    this.arrQuestionInterview.push(this.arrQuestion[index]);
    var audio = new Audio();
    audio.src = this.arrQuestion[index].src;
    audio.load();
    audio.play();
    audio.addEventListener('ended', (event) => {
      this.endQuestion();
    });
    this.middle='1';
    this.p=false;
  }

  continue(index){
    debugger;
    this.arrAnswerInterview[index].taking=false;
    this.startInterview(index+1)
    this.continuei=index;
    }

    
    endQuestion(){
      this.arrAnswerInterview.push({taking:true})
    }


}


