import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { HttpClient } from '@angular/common/http';
import { FileUploadService } from 'src/app/services/file-upload.service';
import * as fileSaver from 'file-saver';
import { HttpResponse } from '@angular/common/http';



@Component({
  selector: 'app-display-video',
  templateUrl: './display-video.component.html',
  styleUrls: ['./display-video.component.scss']
})
export class DisplayVideoComponent implements OnInit {
  videoPath: String;
  localhost="http://127.0.0.1:5000/"
  slideIndex = 1;
  show: Boolean = false;


  @ViewChild('videoPlayer', { static: false }) videoplayer: ElementRef;

  toggleVideo(event: any) {
    debugger;
    this.videoplayer.nativeElement.play();
  }

  constructor(private httpClient: HttpClient, private fileUploadService: FileUploadService) { }

  showVideo() {
    this.show = ! this.show 
  }



  imageObject: Array<object> = [{
    image: 'http://127.0.0.1:5000/images/face.jpg',
    thumbImage: 'http://127.0.0.1:5000/images/face.jpg',
    alt: 'recognize face',
    title: 'recognize face'
  }, {
    image: "http://127.0.0.1:5000/images/eye.jpg",
    thumbImage: "http://127.0.0.1:5000/images/eye.jpg",
    title: 'recognize eye',
    alt: 'recognize eye'
  }, {
    image: "http://127.0.0.1:5000/images/smile.jpg",
    thumbImage:  "http://127.0.0.1:5000/images/smile.jpg",
    title: 'recognize smile',
    alt: 'recognize smile'
  }, {
    image: "http://127.0.0.1:5000/images/hands.jpg",
    thumbImage: "http://127.0.0.1:5000/images/hands.jpg",
    title: 'reconize hand',
    alt: 'reconize hands'
  }, {
    image: 'http://127.0.0.1:5000/images/notFace.jpg',
    thumbImage: 'http://127.0.0.1:5000/images/notFace.jpg',
    title: ' no  targeted face',
    alt: ' no  targeted face'
  }
  ];


 

  ngOnInit() {

    this.videoPath=this.localhost+this.videoPath
    console.log(this.videoPath)

  }
}