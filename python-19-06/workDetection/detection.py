import cv2
from workDetection import detect_objects
import os

# constant define
# arr results
from workDetection.movment2 import diffImg, marcar_zonas

a = [0, 0, 0, 0, 0]  # the detection function enter 24 times in a second

# to recognize face, eye, smile,hand
timesInFunction = 34
faceMin = 70
faceScore = 30
eyeMin = 30
eyeScore = 25
smileMax = 1
smileMin = 10
smileScore = 20
handMin = 10
handMax = 40
handScore = 15
movMin = 35
movScore = 10

# cap = cv2.VideoCapture
# הנתיב לשמירת הסרטון המעובד
destPath = r"processedVideos/"


# מקבל את הנתיב ושם- פונקציית העיבוד
def DetectSaveVideo(cap, fileName):
    times = 0
    # קריאת הנתיב והדלקת הסרטון
    capture = cv2.VideoCapture(cap)
    # Get the Default resolutions- frame sizes,  check the frame width and height
    # גודל מסך הסרטון לצורך השמירה
    frame_width = int(capture.get(3))
    frame_height = int(capture.get(4))

    # הגדרת סוג הסאטון שישמר - webm
    fourcc = cv2.VideoWriter_fourcc('V', 'P', '8', '0')

    # קביעת הסיומת לסרטון שהועלה
    li = list(fileName.split("."))
    fileName = li[0] + '.webm'
    # הגדרת השמירה- נתיב - תקיית הסרטונים המעובדים, סוג, גדלים
    out = cv2.VideoWriter(destPath + fileName, fourcc, 10,
                          (frame_width, frame_height))

    # Check if camera opened successfully
    if (capture.isOpened() == False):
        print("Error opening video stream or file")
    # frame title
    win_marcas = "Zonas Marcadas"
    cv2.namedWindow(win_marcas)
    try:
        # קריאת 3 תמונות ראשונות
        t_minus = cv2.cvtColor(capture.read()[1], cv2.COLOR_RGB2GRAY)
        t = cv2.cvtColor(capture.read()[1], cv2.COLOR_RGB2GRAY)
        t_plus = cv2.cvtColor(capture.read()[1], cv2.COLOR_RGB2GRAY)
        # הגדלת גודל מסך התזוזה
        original = cv2.resize(capture.read()[1], (int(capture.get(3)), int(capture.get(4))),
                              interpolation=cv2.INTER_CUBIC)
    except:
        return fileName, times

    # Read until video is completed
    while (capture.isOpened()):
        # Capture frame-by-frame
        # capture.read- returns a bool (True/False). If frame is read correctly= ret,
        # מחזירה שני משתנים אחד בוליאני אם הצליח לקרא את הסרטון ובframe את מה שקרא
        ret, frame = capture.read()
        if ret == True:
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            # מחשב את הטוחים של התמונות שנקראו לצוך בדיקת התזוזה
            imagen_delta = diffImg(
                cv2.resize(t_minus, (int(capture.get(3)), int(capture.get(4))), interpolation=cv2.INTER_CUBIC),
                cv2.resize(t, (int(capture.get(3)), int(capture.get(4))), interpolation=cv2.INTER_CUBIC),
                cv2.resize(t_plus, (int(capture.get(3)), int(capture.get(4))), interpolation=cv2.INTER_CUBIC))
            # ספירת כמה פעמים הפונקצייה קוראית לצורך התוצאה הסופית
            times += 1
            # זימון פוקציות העיבוד ושמירתם במשתנה עם הסימנים
            imagen_zonas_marcadas = marcar_zonas(imagen_delta, frame, a)
            imagen_zonas_marcadas = detect_objects.detect(gray, frame, a)

            # הצגת התוצאה על המסך
            cv2.imshow(win_marcas, imagen_zonas_marcadas)

            # write the  frame-שמירת הסרטון
            out.write(imagen_zonas_marcadas)
            try:
                # קריאת 3 תמונות ראשונות
                t_minus = t
                t = t_plus
                t_plus = cv2.cvtColor(capture.read()[1], cv2.COLOR_RGB2GRAY)
                original = cv2.resize(capture.read()[1], (int(capture.get(3)), int(capture.get(4))),
                                      interpolation=cv2.INTER_CUBIC)
            except:
                return fileName, times

            # Press Q on keyboard to  exit
            if cv2.waitKey(25) & 0xFF == ord('q'):
                return fileName, times
                break
        # Break the loop
        else:
            return fileName, times
            break


# מזמנת את הפונקציה של העיבוד ומחשבת את התוצאות הסופיות ביחס לגודל הסרטון
def finalResult(path, fileName):
    # clean images folder
    files = os.listdir \
        (r'C:/Users/henri/Documents/project/python-19-06/processedVideos/images/')
    for file in files:
        os.remove(r'C:/Users/henri/Documents/project/python-19-06/processedVideos/images/' + file)
    # the detection function
    # זימון פונקציית העיבוד
    destinationPath, times = DetectSaveVideo(path, fileName)
    print(times)
    # src_dir = r"/workDetection\images"
    # dst_dir = r"C:\Users\henri\Documents\Batia Zinger\פרוייקט\Python\python-29-04\processedVideos\images"
    # for jpgfile in glob.iglob(os.path.join(src_dir, "*.jpg")):
    #     shutil.copy(jpgfile, dst_dir)
    # function to check the video length
    # length = int(videoDuration.get_length(path))
    print(a)
    a[1] /= 2
    # תוצאות העיבוד ביחס לסרטון
    for i in range(len(a)):
        if a[i] > 0:
            # calculate the percentages
            a[i] = a[i] * 100 / times
            # the detection function enter 34 times in a second
            # to recognize face, eye, smile,hand
            # a[i] = a[i] / timesInFunction
            if a[i] > 100:
                a[i] = 100
            a[i] = int(a[i])
    print(a)
    remark = ""
    score = 0
    if faceMin < a[0]:
        score = faceScore
        remark += "Your direct and consistent look radiates authority and  makes the interviewers take your words seriously."
    if a[1] > eyeMin:
        score += eyeScore
        remark += r"\Your steady eye contact with the interviewer inspires credibility and directness, self-confidence "
    if smileMax < a[2] < smileMin:
        score += smileScore
        remark += r"\Your smile occasionally shows satisfaction"
    if handMax < a[3] < handMin:
        score += handScore
        remark += r"\You use your hands correctly"
    if movMin > a[4]:
        score += movScore
        remark += r"\Your movments is correctly"

    return destinationPath, a, score, remark


# finalResult(r"C:\Users\henri\Pictures\Camera Roll\WIN_20200621_12_08_29_Pro.mp4", 'aaa.mp4')
# capture.release()
# out.release()
# Closes all the frames
cv2.destroyAllWindows()
