import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import{ FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { MatVideoModule} from 'mat-video'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import {ChartModule} from 'primeng/chart';
import { MatRadioModule } from '@angular/material';
import {Http,ResponseContentType, HttpModule} from '@angular/http'
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { NgImageSliderModule } from 'ng-image-slider';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { MenuComponent } from './components/menu/menu.component';
import {ApiComponent} from './components/api/api.component'
import { from } from 'rxjs';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { HomeComponent } from './components/home/home.component';
import { StudyComponent} from './components/study/study.component';
import { UserPageComponent } from './components/user-page/user-page.component'
import { DragDropDirective } from './drag-drop.directive';
import { LectureComponent } from './components/lecture/lecture.component';
import { WorkInterviewComponent } from './components/work-interview/work-interview.component';
import { UserProgressComponent } from './components/user-progress/user-progress.component';
import { CameraCaptureComponent } from './components/camera-capture/camera-capture.component';
import { DisplayVideoComponent } from './components/display-video/display-video.component';
import { UserDetalisComponent } from './components/user-detalis/user-detalis.component';
import { InterviewComponent } from './components/interview/interview.component';
import { RealLectureComponent } from './components/real-lecture/real-lecture.component';
import { TestComponent } from './components/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    NewUserComponent,
    MenuComponent,
    FileUploadComponent,
    ApiComponent,
    HomeComponent,
    StudyComponent,
    UserPageComponent,
    DragDropDirective,
    LectureComponent,
    WorkInterviewComponent,
    UserProgressComponent,
    CameraCaptureComponent,
    DisplayVideoComponent,
    UserDetalisComponent,
    InterviewComponent,
    RealLectureComponent,
    TestComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    MatVideoModule,
    ReactiveFormsModule,
    ChartsModule,
    ChartModule,
    MatRadioModule,
    HttpModule,
    NgImageSliderModule
  
    

  ],
  providers: [    ScrollToService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
