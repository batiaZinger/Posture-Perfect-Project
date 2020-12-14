import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { DisplayVideoComponent } from '../display-video/display-video.component';

@Component({
  selector: 'app-user-detalis',
  templateUrl: './user-detalis.component.html',
  styleUrls: ['./user-detalis.component.scss']
})
export class UserDetalisComponent implements OnInit {
  serverData: Object;
  columns = [];
  arrScore = [];
  arrRemarks = [];
  arrDate = [];
  arrFace = [];
  arrEye = [];
  arrSmile = [];
  arrHand = [];
  arrVideo = [];
  lenth = [];
  show: Boolean = false;
  videoPath: String;
  localhost="http://127.0.0.1:5000/"

  constructor(private userService: UserService, private httpClient: HttpClient, private fileUploadService: FileUploadService) { }

  getOnlyDateByFormat_dd_mm_yyy(d, format = null) {
    if (!format)
      format = '/'
    let today = new Date(d);
    let dd = today.getDate().toString();
    let mm = (today.getMonth() + 1).toString(); //January is 0!
    let yyyy = today.getFullYear();

    if (+dd < 10) {
      dd = '0' + dd;
    }

    if (+mm < 10) {
      mm = '0' + mm;
    }

    return dd + format + mm + format + yyyy;
  }


  showVideo(path) {
    this.show=false
    debugger;
    this.videoPath=this.localhost+path;
    this.show = true
  }

  ngOnInit() {
    this.columns = ["date", "remarks", "total score", "face score", "eye score", "smile score", "hand score"]
    this.userService.getAllVideos().subscribe(data => {
      this.serverData = data.body
      console.log(this.serverData)
      let arr = []
      let entries = []
      //separating the json object - serverData
      for (let key in this.serverData) {
        let index = parseInt(key.replace(/^\D+/g, ''));
        entries.push(this.serverData[key]);
      }
      for (let i in entries[0]) {
        arr[i] = JSON.parse(entries[0][i])
      }

      for (let i in arr) {
        //video score
        this.arrScore = arr.map(a => a.score);
        //video date
        this.arrDate = arr.map(a => this.getOnlyDateByFormat_dd_mm_yyy(a.date))
        //video remarks
        this.arrRemarks = arr.map(a => a.remark)
        // //video path
        this.arrVideo = arr.map(a => a.videoPath)
        //face,eye.smile,hand
        this.arrFace = arr.map(a => a.face)
        this.arrEye = arr.map(a => a.eye)
        this.arrSmile = arr.map(a => a.smile)
        this.arrHand = arr.map(a => a.hand)

        this.lenth[i] = i
      }
      console.log(this.lenth)
    })

  }

}
