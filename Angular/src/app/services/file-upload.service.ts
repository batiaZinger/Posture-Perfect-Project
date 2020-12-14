import { Injectable, } from '@angular/core';
import { Observable, throwError, from } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Http, ResponseContentType } from '@angular/http';
import { map, catchError } from "rxjs/operators";
import { FileUploadComponent } from '../components/file-upload/file-upload.component';
import { DisplayVideoComponent } from '../components/display-video/display-video.component';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  userMail: string;
  subjectId;
  result;
  path;

  constructor(private httpClient: HttpClient, private http: Http) { }




  //send the file to the server 
  postFile(fileToUpload: File): Observable<void> {
    let fileupload
    fileupload = fileToUpload;
    console.log(this.userMail)
    debugger
    //python url
    const endpoint = 'http://127.0.0.1:5000/file-upload';
    const formData: FormData = new FormData();
    //in fromData we have evrything that we need to the detection
    formData.append('file', fileupload, fileupload.name);
    formData.append(this.userMail, this.subjectId)
    formData.append(this.subjectId, this.userMail)
    return this.httpClient
      .post(endpoint, formData, { /*headers: yourHeadersConfig*/ })
      .pipe(
        //pass the score and the remarks to the user
        map(res => {
          console.log(res), FileUploadComponent.prototype.message = res[0]["message"]
            , FileUploadComponent.prototype.path = res[1]["path"]
            , DisplayVideoComponent.prototype.videoPath = res[1]["path"]
            , FileUploadComponent.prototype.url = res[1]
            , this.path = res
            , FileUploadComponent.prototype.result = res[2]["result"]
            , FileUploadComponent.prototype.grade = res[3]["score"]
            , FileUploadComponent.prototype.remarks = res[4]["remark"]
            , console.log(FileUploadComponent.prototype.remarks)
        }),
        catchError(
          (error: Response) => {
            if (error.status === 404) {
              console.log(error);
              return throwError("err");
            }
            return throwError("err2");
          })
      );
  }

  // public blobToFile = (theBlob: Blob, fileName: string): File => {
  //   var b: any = theBlob;
  //   //A Blob() is almost a File() - it's just missing the two properties below which we will add
  //   b.lastModifiedDate = new Date();
  //   b.name = fileName;

  //   //Cast to a File() type
  //   return <File>theBlob;
  // }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\n Message: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }




  getVideo(file: string): Observable<any> {
    debugger;
    let a: Object = { 'fileName': file };

    return this.http.post('http://127.0.0.1:5000/processedVideos/',
      <JSON>a,
      { responseType: ResponseContentType.Blob }
    );
    // let params1 = new HttpParams().set("fileName", file);
    // return this.httpClient.get('http://127.0.0.1:5000/processedVideos/',
    // {observe: 'response', responseType: 'blob'})
    //   ,{
    //     params: {
    //       fileName: file
    //     }
    //     ,{
    //     observe: 'body',
    //     responseType:'blob' as 'json'
    //   }
    //   )
  }

}


