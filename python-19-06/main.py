# מקבל קריאה מהלקוח- אנגולר לשמירת קובץ
# הלקוח מעלה סרטון לשרת והוא שומר אותו בנתיב שהכנסנו
import os

from flask_cors import CORS
from flask import request, jsonify, send_file, Flask
from app import app
from werkzeug.utils import secure_filename
from workDetection import detection
from lectureDetection import detectionl
from common import user, videos
import sqlFunctions
from datetime import datetime

CORS(app)

ALLOWED_EXTENSIONS = set(['mp4', 'avi', 'webm'])


# check if the video extention is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# get a request with a file, user mail, subjectId
# enter to the uploads file and send to the detection function
# and then insert the processed video in the data base
@app.route('/file-upload', methods=['POST'])
def upload_file():
    # videoPath = ""
    lst = list(request.form)
    userMail = lst[0]
    subjectId = lst[1]

    # check if the post request/ has the file part
    if 'file' not in request.files:
        resp = jsonify({'message': 'No file part in the request'})
        resp.status_code = 400
        return resp
    file = request.files['file']
    # check if the file is not empty
    if file.filename == '':
        resp = jsonify({'message': 'No file selected for uploading'})
        resp.status_code = 400
        return resp
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        filePath = r"uploadsVideos/" + filename
        # send to detection function
        if subjectId == '1':  # work interview
            videoPath, result, score, remark = detection.finalResult(filePath, filename)

        else:  # lecture
            videoPath, result, score, remark = detectionl.finalResult(filePath, filename)

        # video = videos.Video(userMail, videoPath, subjectId, score, remark)
        # insert in the data base
        sqlFunctions.videosInsert(userMail, videoPath, subjectId, score, remark, int(result[0]), int(result[1]),
                                  int(result[2]), int(result[3]))
        result[0] = 'face: ' + str(result[0]) + ' %'
        result[1] = 'eyes: ' + str(result[1]) + ' %'
        result[2] = 'smile: ' + str(result[2]) + ' %'
        result[3] = 'hands: ' + str(result[3]) + ' %'
        result[4] = 'movment: ' + str(result[4]) + ' %'
        print(result)
        resp = jsonify({'message': 'File successfully uploaded'},
                       {'path': str(videoPath)}, {'result': str(result)},
                       {'score': str(score)}, {'remark': str(remark)})
        resp.status_code = 201
        return resp
    else:
        resp = jsonify({'message': 'Allowed file types are  avi ,mp4,webm'})
        resp.status_code = 400
        return resp


@app.route('/users/add', methods=['POST'])
def add_user():
    # get the new user
    data = request.get_json()
    # create a new user object
    newUser = user.User(data['mail'], data['name'], data['password'])
    print(newUser.mail + " " + newUser.name + " " + newUser.password + " ")
    # insert to the dataBase
    sqlFunctions.userInsert(user.Convert(newUser))
    return jsonify({'message': 'New user successfully added'})


@app.route("/users/all", methods=['GET'])
def getAllUsers():
    # call to a sql function to get all the users
    lst = list(sqlFunctions.getAllUsers())
    return jsonify({'result': [list(row) for row in lst]})


@app.route("/videos/filter/", methods=['GET'])
def getAllVideosFilter():
    userMail = request.args['mail']
    # call to a sql function to get all the videos from a specific user
    lst, s = list(sqlFunctions.getAllVideosFilter(userMail))
    return jsonify({'result': s})


@app.route("/userAndLesson/filter/", methods=['GET'])
def getAllUserAndLessonFilter():
    userMail = request.args['mail']
    subjectId = request.args['subject']
    # call to a sql function to get all the videos from a specific user
    lst = list(sqlFunctions.getAllUserAndLesson(userMail, subjectId))
    return jsonify({'result': [list(row) for row in lst]})


@app.route('/userAndLesson/add', methods=['POST'])
def addUserAndLesson():
    # get the new userAndLesson
    data = request.get_json()
    # insert to the data base
    sqlFunctions.users_lesson_update(data['userMail'], data['lessonId'], data['statusId'], data['subjectId'],
                                     datetime.now().strftime('%x'))
    return jsonify({'message': 'New userAndLesson successfully added'})


@app.route('/processedVideos/', methods=['POST'])
def getprocessedVideos():
    # fileName = json.dumps(request.data)['fileName']
    data = request.get_json()
    fileName = data['fileName']
    return send_file('processedVideos/' + fileName, as_attachment=True)
    # return jsonify({'message': fileName})


if __name__ == "__main__":
    app.run()
