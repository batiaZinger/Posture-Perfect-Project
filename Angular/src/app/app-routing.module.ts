import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user.service';
import { NewUserComponent } from './components/new-user/new-user.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ApiComponent } from './components/api/api.component';
import { HomeComponent } from './components/home/home.component';
import { StudyComponent } from './components/study/study.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { LectureComponent } from './components/lecture/lecture.component';
import { WorkInterviewComponent } from './components/work-interview/work-interview.component';
import { UserProgressComponent } from './components/user-progress/user-progress.component';
import { CameraCaptureComponent } from './components/camera-capture/camera-capture.component';
import { DisplayVideoComponent } from './components/display-video/display-video.component';
import { UserDetalisComponent } from './components/user-detalis/user-detalis.component';
import { MenuComponent } from './components/menu/menu.component';
import { InterviewComponent } from './components/interview/interview.component';
import { TestComponent } from './components/test/test.component';
import { RealLectureComponent } from './components/real-lecture/real-lecture.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path: 'welcome',
      component: WelcomeComponent,
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'userPage',
      component: UserPageComponent
    },

    {
      path: 'lecture',
      component: LectureComponent
    },
    {
      path: 'workInterview',
      component: WorkInterviewComponent,
    },
    {
      path: 'FileUpload',
      component: FileUploadComponent,
    },
    {
      path: 'userProgress',
      component: UserProgressComponent,
    },
    {
      path: 'cameraCapture',
      component: CameraCaptureComponent,
    },
    {
      path: 'displayVideo',
      component: DisplayVideoComponent,
    },
    {
      path: 'userDetails',
      component: UserDetalisComponent,
    }
    ,
    {
      path: 'interview',
      component: InterviewComponent,
    }
    ,
    {
      path: 'test',
      component: TestComponent,
    }
    ,
    {
      path: 'realLecture',
      component: RealLectureComponent,
    }
    ,
    {
      path: 'newUser',
      component: NewUserComponent,
    },
  ]
},
{
  path: 'api',
  component: ApiComponent,
},{
  path: 'menu',
  component: MenuComponent,
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]


})
export class AppRoutingModule { }
