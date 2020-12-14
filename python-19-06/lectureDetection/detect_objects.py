# מזהה פנים, חיוך, ועיניים
import os

import cv2
import numpy as np
import cv2
import math

# loading the cascades
face_cascade = cv2.CascadeClassifier \
        (
        r"C:\Users\henri\AppData\Local\Programs\Python\Python37\Lib\site-packages\cv2\data\haarcascade_frontalface_default.xml")
eye_cascade = cv2.CascadeClassifier \
    (r"C:\Users\henri\AppData\Local\Programs\Python\Python37\Lib\site-packages\cv2\data\haarcascade_eye.xml")
smile_cascade = cv2.CascadeClassifier \
    (r"C:\Users\henri\AppData\Local\Programs\Python\Python37\Lib\site-packages\cv2\data\haarcascade_smile.xml")
hand_cascade1 = cv2.CascadeClassifier \
    (r"C:\Users\henri\AppData\Local\Programs\Python\Python37\Lib\site-packages\cv2\data\Hand_haar_cascade.xml")

# hand_cascade = cv2.CascadeClassifier \
#     (r"C:\Users\henri\AppData\Local\Programs\Python\Python37\Lib\site-packages\cv2\data\hand.xml")
# drews a yellow rectangle if recognize hands
# hands = hand_cascade.detectMultiScale(gray, 1.1, 5)
# for (x_hand, y_hand, w_hand, h_hand) in hands:
#     cv2.rectangle(frame, (x_hand, y_hand), (x_hand + w_hand, y_hand + h_hand), (0, 255, 255), 2)
#     cv2.putText(frame, "THIS IS HAND", (00, 220), cv2.FONT_HERSHEY_SIMPLEX, 1, 2, False)
#     a[3] += 1


def hands(frame, a,checkArr):
    blur = cv2.GaussianBlur(frame, (5, 5), 0)  # BLURRING IMAGE TO SMOOTHEN EDGES
    gray = cv2.cvtColor(blur, cv2.COLOR_BGR2GRAY)  # BGR -> GRAY CONVERSION
    retval2, thresh1 = cv2.threshold(gray, 70, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)  # THRESHOLDING IMAGE
    hand = hand_cascade1.detectMultiScale(thresh1, 1.3, 5)  # DETECTING HAND IN THE THRESHOLDE IMAGE
    mask = np.zeros(thresh1.shape, dtype="uint8")  # CREATING MASK
    for (x, y, w, h) in hand:  # MARKING THE DETECTED ROI
        cv2.rectangle(frame, (x, y), (x + w, y + h), (122, 122, 0), 2)
        cv2.rectangle(mask, (x, y), (x + w, y + h), 255, -1)
        cv2.putText(frame, "Identify a hands", (x + 10, y - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (122, 122, 0), False)
        cv2.imwrite(r'images/'+'hand.jpg', frame)
        # img=cv2.imread(frame,1)
        # cv2.imwrite(os.path.join('processedVideos/images/ '+'waka.jpg'), img)

        checkArr[3] = True

        a[3] += 1
    img2 = cv2.bitwise_and(thresh1, mask)
    final = cv2.GaussianBlur(img2, (7, 7), 0)
    # contours, hierarchy = cv2.findContours(final, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    _, contours, _ = cv2.findContours(final, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    cv2.drawContours(frame, contours, 0, (255, 255, 0), 3)
    cv2.drawContours(final, contours, 0, (255, 255, 0), 3)

    if len(contours) > 0:
        cnt = contours[0]
        hull = cv2.convexHull(cnt, returnPoints=False)
        # finding convexity defects
        defects = cv2.convexityDefects(cnt, hull)
        count_defects = 0
        # applying Cosine Rule to find angle for all defects (between fingers)
        # with angle > 90 degrees and ignore defect
        if defects is not None:
            for i in range(defects.shape[0]):
                p, q, r, s = defects[i, 0]
                finger1 = tuple(cnt[p][0])
                finger2 = tuple(cnt[q][0])
                dip = tuple(cnt[r][0])
                # find length of all sides of triangle
                a = math.sqrt((finger2[0] - finger1[0]) ** 2 + (finger2[1] - finger1[1]) ** 2)
                b = math.sqrt((dip[0] - finger1[0]) ** 2 + (dip[1] - finger1[1]) ** 2)
                c = math.sqrt((finger2[0] - dip[0]) ** 2 + (finger2[1] - dip[1]) ** 2)
                # apply cosine rule here
                angle = math.acos((b ** 2 + c ** 2 - a ** 2) / (2 * b * c)) * 57.29
                # ignore angles > 90 and highlight rest with red dots
                if angle <= 90:
                    count_defects += 1
    return frame


def detect(gray, frame, a):
    checkArr = [False, False, False, False]

    # drews a light blue rectangle if recognize hands
    frame = hands(frame, a,checkArr)

    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    for (x, y, w, h) in faces:
        # drews a blue rectangle if recognize a face
        cv2.rectangle(frame, (x, y), ((x + w), (y + h)), (255, 0, 0), 2)
        cv2.putText(frame, "your face is front the camera", (x + 10, y - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0))
        cv2.imwrite(r'images/'+'face.jpg', frame)

        roi_gray = gray[y:y + h, x:x + w]
        roi_color = frame[y:y + h, x:x + w]
        checkArr[0] = True
        a[0] += 1
        eye = eye_cascade.detectMultiScale(roi_gray, 1.2, 18)
        for (x_eye, y_eye, w_eye, h_eye) in eye:
            # drews a green rectangle if recognize eyes
            cv2.rectangle(roi_color, (x_eye, y_eye), (x_eye + w_eye, y_eye + h_eye), (0, 180, 60), 2)
            cv2.putText(frame, "The eyes are focused on the camera", (x_eye + 10, y_eye - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 180, 60), False)
            cv2.imwrite(r'images/'+'eye.jpg', frame)
            checkArr[1] = True
            a[1] += 1
        smiles = smile_cascade.detectMultiScale(roi_gray, 1.8, 20)
        for (sx, sy, sw, sh) in smiles:
            # drews a red rectangle if recognize a smile
            cv2.rectangle(roi_color, (sx, sy), ((sx + sw), (sy + sh)), (0, 0, 255), 2)
            cv2.putText(frame, "Identify a smile", (sx + 10, sy - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), False)
            cv2.imwrite(r'images/'+'smile.jpg', frame)
            checkArr[2] = True
            a[2] += 1
    if checkArr[0] == False and checkArr[1] == False and checkArr[2] == False:
        cv2.putText(frame, "your face are not in front the camera", (100, 100),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), False)
        cv2.imwrite(r'images/'+'notFace.jpg', frame)

    return frame


cv2.destroyAllWindows()
