import cv2

from lectureDetection.movment2 import diffImg, marcar_zonas
from workDetection import detect_objects
from common import videos
import glob
import shutil
import os

# display from file
# cap = cv2.VideoCapture(r"C:\Users\henri\Documents\Batia Zinger\פרוייקט\Python\סרטון וידאו חדש.mp4")

# display from camera

# constant define
# arr results
a = [0, 0, 0, 0, 0, 0]
# the detection function enter 24 times in a second
# to recognize face, eye, smile,hand
timesInFunction = 34
movMin=60
movScore=50
faceMin = 50
faceScore = 20
eyeMin = 30
eyeScore = 10
smileMax = 1
smileMin = 10
smileScore = 5
handMin = 10
handMax = 40
handScore = 15

# cap = cv2.VideoCapture

destPath = r"processedVideos/"


def DetectSaveVideo(cap, fileName):
    times=0
    # Get the Default resolutions
    capture = cv2.VideoCapture(cap)
    # frame sizes,  check the frame width and height
    frame_width = int(capture.get(3))
    frame_height = int(capture.get(4))

    # to where write the video
    # fourcc = cv2.VideoWriter_fourcc(*'MP4V')
    fourcc = cv2.VideoWriter_fourcc('V', 'P', '8', '0')

    li = list(fileName.split("."))
    fileName = li[0] + '.webm'
    out = cv2.VideoWriter(destPath + fileName, fourcc, 10,
                          (frame_width, frame_height))

    # Check if camera opened successfully
    if (capture.isOpened() == False):
        print("Error opening video stream or file")
        exit(-1)  # Error acceso a la camara

    win_marcas = "Zonas Marcadas"
    cv2.namedWindow(win_marcas)

    # Leemos las tres primeras imagenes
    t_minus = cv2.cvtColor(capture.read()[1], cv2.COLOR_RGB2GRAY)
    t = cv2.cvtColor(capture.read()[1], cv2.COLOR_RGB2GRAY)
    t_plus = cv2.cvtColor(capture.read()[1], cv2.COLOR_RGB2GRAY)

    original = cv2.resize(capture.read()[1], (int(capture.get(3)),int(capture.get(4))), interpolation=cv2.INTER_CUBIC)

    # Read until video is completed
    while (capture.isOpened()):
        # Capture frame-by-frame
        # returns a bool (True/False). If frame is read correctly= ret,
        ret, frame = capture.read()
        if ret == True:
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            # Calculamos la zonas que se han modificado
            imagen_delta = diffImg(cv2.resize(t_minus, (320, 240), interpolation=cv2.INTER_CUBIC),
                                   cv2.resize(t, (320, 240), interpolation=cv2.INTER_CUBIC),
                                   cv2.resize(t_plus, (320, 240), interpolation=cv2.INTER_CUBIC))
            times+=1
            imagen_zonas_marcadas = detect_objects.detect(gray, frame, a)
            imagen_zonas_marcadas = marcar_zonas(imagen_delta, original.copy(), a)

            cv2.imshow(win_marcas, imagen_zonas_marcadas)

            # write the  frame
            out.write(imagen_zonas_marcadas)
            if capture.read():
                # Leemos las siguientes imagenes
                t_minus = t
                t = t_plus
                t_plus = cv2.cvtColor(capture.read()[1], cv2.COLOR_RGB2GRAY)
                original = cv2.resize(capture.read()[1], (320, 240), interpolation=cv2.INTER_CUBIC)

            # Press Q on keyboard to  exit
            if cv2.waitKey(25) & 0xFF == ord('q'):
                return fileName,times
                break
        # Break the loop
        else:
            return fileName,times
            break




def finalResult(path, fileName):
    # clean images folder
    # files = os.listdir \
    #     (r'C:/Users/henri/Documents/Batia Zinger/פרוייקט/Python/python-29-04/processedVideos/images/')
    # for file in files:
    #     os.remove(r'C:/Users/henri/Documents/Batia Zinger/פרוייקט/Python/python-29-04/processedVideos/images/' + file)
    # files = os.listdir \
    #     (r'C:/Users/henri/Documents/Batia Zinger/פרוייקט/Python/python-29-04/workDetection/images/')
    # for file in files:
    #     os.remove(r'C:/Users/henri/Documents/Batia Zinger/פרוייקט/Python/python-29-04/workDetection/images/' + file)

    # the detection function
    destinationPath ,times= DetectSaveVideo(path, fileName)

    # src_dir = r"/workDetection\images"
    # dst_dir = r"C:\Users\henri\Documents\Batia Zinger\פרוייקט\Python\python-29-04\processedVideos\images"
    # for jpgfile in glob.iglob(os.path.join(src_dir, "*.jpg")):
    #     shutil.copy(jpgfile, dst_dir)
    # function to check the video length
    # length = int(videoDuration.get_length(path))
    print(a)
    for i in range(len(a)):
        if a[i] > 0:
            a[i] = a[i] * 100 /times
        a[i] = int(a[i])

    print(a)
    remark = ""
    score = 0
    if a[5] > movMin:
        score =movScore
        remark = "your movment are correctly"
    if faceMin < a[0]:
        score = faceScore
        remark += "Your direct and consistent look radiates authority and will make the  audiance take your words seriously."
    if a[1] > eyeMin:
        score += eyeScore
        remark += r"\Your steady eye contact with the audiance inspires credibility and directness, self-confidence "
    if smileMax < a[2] < smileMin:
        score += smileScore
        remark += r"\Your smile occasionally shows satisfaction"
    if handMax < a[3] < handMin:
        score += handScore
        remark += r"\You used your hands correctly"


    return destinationPath, a, score, remark
# finalResult(0, 'a.mp4')


# capture.release()
# out.release()
# Closes all the frames
cv2.destroyAllWindows()
