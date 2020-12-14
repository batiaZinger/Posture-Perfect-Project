import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AddUserService } from 'src/app/services/add-user.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js'
import { Label } from 'ng2-charts';



@Component({
  selector: 'app-user-progress',
  templateUrl: './user-progress.component.html',
  styleUrls: ['./user-progress.component.scss']
})
export class UserProgressComponent implements OnInit {
  serverData;
  userName: string;
  userMail: string;
  arrCode = [];
  arrScore = [];
  arrRemarks = [];
  arrDate = [];
  arrVideo = [];
  arrFace = [];
  arrEye = [];
  arrSmile = [];
  arrHand = []


  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[]/* = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes']*/;
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[]
    = [
      { data: this.arrFace, label: 'face' },
      { data: this.arrEye, label: 'eyes' },
      { data: this.arrSmile, label: 'smile' },
      { data: this.arrHand, label: 'hands' }

    ];


  public barChartColors: any[] = [
    {
      backgroundColor: '#3899ec',
    },
    {
      backgroundColor: 'blue'
    },
    {
      backgroundColor: 'red'
    },
    {
      backgroundColor: 'yellow'
    }

  ]



  constructor(private httpClient: HttpClient, private addUserService: AddUserService, private fileUploadService: FileUploadService) { }

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

  getUserVideos() {
    //get function that send the user mail and gets all the videos from this user
    this.httpClient.get('http://127.0.0.1:5000/videos/filter/', {
      params: {
        mail: this.userMail
      },
      observe: 'response'
    }).subscribe(data => {
      this.serverData = data.body
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
        //video code
        this.arrCode = arr.map(a => a.videoCode);
        //video score
        this.arrScore = arr.map(a => a.score);
        //video date
        this.arrDate = arr.map(a => this.getOnlyDateByFormat_dd_mm_yyy(a.date))
        //video remarks
        this.arrRemarks = arr.map(a => a.remark)
        //video path
        this.arrVideo = arr.map(a => a.videoPath)
        //face,eye.smile,hand
        this.arrFace = arr.map(a => a.face)
        this.arrEye = arr.map(a => a.eye)
        this.arrSmile = arr.map(a => a.smile)
        this.arrHand = arr.map(a => a.hand)
      }
      //build the chart
      this.barChartLabels = this.arrDate;
      this.barChartData = [
        { data: this.arrFace, label: 'פנים' },
        { data: this.arrEye, label: 'עניים' },
        { data: this.arrSmile, label: 'חיוך' },
        { data: this.arrHand, label: 'ידיים' }
      ];

      this.userName = this.addUserService.userName;
    })
  }

  ngOnInit() {
    this.userMail = this.fileUploadService.userMail
    this.getUserVideos()
  }


}

