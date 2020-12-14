import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {
  userName: string;
  userPassword: string;
  userMessage: string;

  constructor(private httpClient: HttpClient) { }


  postUser(user: JSON) {
    const endPoint = 'http://127.0.0.1:5000/users/add';
    return this.httpClient
      .post(endPoint, user, {/*headers: headers*/ })
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



}
