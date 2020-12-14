import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  w:boolean;
  l:boolean;

  constructor() { }

  ngOnInit() {
  }

open(url){
  window.open(url)
}

  work(){
    this.w=true;
    this.l=false;
    FileUploadService.prototype.subjectId='1'


  }
  lecture(){
    this.l=true;
    this.w=false;
    FileUploadService.prototype.subjectId='2'
  }

}
