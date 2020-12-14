import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { WorkInterviewComponent } from '../components/work-interview/work-interview.component';

@Injectable({
  providedIn: 'root'
})
export class StudyService {
  serverData: any;

  constructor(private httpClient: HttpClient) { }

  PostUserAndLesson(user_lesson: JSON) {

    const endPoint = 'http://127.0.0.1:5000/userAndLesson/add';
    return this.httpClient
      .post(endPoint, user_lesson, {/*headers: headers*/ })
      .pipe(map(response => console.log(response)),
        catchError(
          (error: Response) => {
            if (error.status === 404) {
              console.log(error);
              return throwError("err");
            }
          })
      );
  }

  GetUserAndLesson(userMail, statusId) {
    debugger;
    return this.httpClient.get('http://127.0.0.1:5000/userAndLesson/filter/', {
      params: {
        mail: userMail,
        subject: statusId
      },
      observe: 'response'
    })

  }



}
