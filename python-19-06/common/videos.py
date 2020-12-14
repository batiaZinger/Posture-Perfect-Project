class Video:
    def __init__(self, userMail, videoPath, subjectId,face,eye,smile,hand,date, score=1, remark=' ',code=None):
        self.videoCode=code
        self.userMail = userMail
        self.videoPath = videoPath
        self.subjectId = subjectId
        self.score = score
        self.remark = remark
        self.date=date
        self.face=face
        self.eye=eye
        self.smile=smile
        self.hand=hand


def Convert(video):
    string = (video.userMail + ", " + video.videoPath + ", " + video.subjectId+", "+str(video.score)+", "+video.remark)
    li = list(string.split(","))
    int(li[3])
    # li=str
    #
    # li.append(video.userMail)
    # li.append(video.videoPath)
    # li.append(video.subjectId)
    return li
