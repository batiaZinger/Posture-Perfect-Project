import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  fileToUpload: File =null;
  format: string;
  url: string | ArrayBuffer;
  grade:number;
  remarks:string;
  message:string;
  path:string;
  result:[];
  // result:number;
  videoSource;
  r:boolean=false

  // @ViewChild('video', { static: true }) videoElement: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;

  @ViewChild('videoElement',{static:true}) videoElement: any;  
  @ViewChild('videoPlayer',{static:true}) videoplayer: ElementRef;

  // video: any;

  score: any;

  constructor(private fileUploadService:FileUploadService,private httpClient: HttpClient, private renderer: Renderer2) { }




  ngOnInit() {
  }

  handleFileInput(event /*files: FileList*/) {
    //If you will to handle multifile selection, than you can iterate through this files array.
    console.log("handleFileInput");
    this.fileToUpload = event.item(0);
    console.log(event.item(0));
    console.log(this.fileToUpload.name);    
  }

  //Now create file upload function by calling you file-upload.service:
  uploadFileToActivity() {
    this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
      
      this.url=this.url["path"]
      console.log(this.url)
    }, error => {
      console.log(error);
    });
    if (this.fileToUpload) {
      let reader = new FileReader();
      reader.readAsDataURL(this.fileToUpload);

         if(this.fileToUpload.type.indexOf('video')> -1){//video display
        this.format = 'video';
      }
      reader.onload = (event) => {
        debugger
        this.url = (<FileReader>event.target).result;
      }
    }
    this.r=true;

  }


toggleVideo(event: any) {
  this.videoSource=this.url
    this.videoplayer.nativeElement.play();
}

  deleteAttachment(index) {
    this.fileToUpload=null
  }

 
}
