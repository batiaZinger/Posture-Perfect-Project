import json

import pyodbc
from common import videos

# connect to data base
conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=LAPTOP-2M1D23EP;'
                      # 'server=ELI7-SQL\SQL14;'
                      'Database=usersDb;'
                      'Trusted_Connection=yes;')

cursor = conn.cursor()



# insert a user to the users table
def userInsert(lst):
    sql_command = """INSERT INTO usersDb.dbo.Users (userMail,userName,userPassword) VALUES (?,?,?);"""
    cursor.execute(sql_command, list(lst))
    conn.commit()


# insert a video to the videos table
def videosInsert(userMail, videoPath, subjectId, score, remarks, face, eye, smile, hand):
    sql_command = """INSERT INTO usersDb.dbo.Videos (userMail,videoPath,subjectId,score,remarks,faceScore,eyeScore,smileScore,handScore ) VALUES (?,?,?,?,?,?,?,?,?);"""
    cursor.execute(sql_command, userMail, videoPath, subjectId, score, remarks, face, eye, smile, hand)
    conn.commit()


# updating the user's learning status
# if he just begin now this lesson so insert
def users_lesson_update(userMail, lessonId, statusId, subjectId, studyDate):
    sql_command = """
            begin tran
            if exists (select * from usersDb.dbo.UserAndLesson where userMail=? and lessonId=?)
            begin
             update usersDb.dbo.UserAndLesson set statusId=? , studyDate=? where userMail=? and lessonId=?
            end
            else
            begin
               insert into usersDb.dbo.UserAndLesson (userMail, lessonId, statusId, subjectId, studyDate) values (?,?,?,?,?)
            end
            commit tran
                """
    cursor.execute(sql_command, userMail, lessonId, statusId, studyDate, userMail, lessonId, userMail, lessonId,
                   statusId, subjectId, studyDate)
    conn.commit()


def getAllUsers():
    a = list(cursor.execute('SELECT * FROM Users'))
    return a


def getAllLessons():
    l = list(cursor.execute('SELECT * FROM Lessons'))
    return l


def getAllVideos():
    v = list(cursor.execute("SELECT * FROM Videos"))
    return v


# get all the videos from a specific user
def getAllVideosFilter(mail):
    sql_command = """select * from Videos where userMail = ? """
    v = list(cursor.execute(sql_command, mail))
    s = {}
    # creates a video object for each line
    for i in range(0, len(v)):
        newVideo = videos.Video(v[i][1], v[i][2], v[i][3], v[i][7], v[i][8], v[i][9],
                                v[i][10],str(v[i][6]), v[i][4],v[i][5], v[i][0])
        s[i] = json.dumps(newVideo.__dict__)
    return v, s


def getAllSubjects():
    s = list(cursor.execute('SELECT * FROM Subjects'))
    return s


def getAllStatus():
    st = list(cursor.execute('SELECT * FROM LessonStatus'))
    return st


# get all the lesson that a specific user is learning/ learned and the status...
def getAllUserAndLesson(userMail, subjectId):
    sql_command = """SELECT * FROM UserAndLesson WHERE userMail=? AND subjectId=?"""
    u = list(cursor.execute(sql_command, userMail, subjectId))
    return u


