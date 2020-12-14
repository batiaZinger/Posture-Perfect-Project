from datetime import datetime

class User_Lesson:
    def __init__(self,userMail,lessonId,statusId):
        self.userMail = userMail
        self.lessonId = lessonId
        self.statusId = statusId
        self.studyDate=datetime.now().strftime('%D')


