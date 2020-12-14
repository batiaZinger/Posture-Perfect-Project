# IMPORTING LIBRARIES
# מזהה כמה אצבעות מורמות
import numpy as np
import cv2
import math

# LOADING HAND CASCADE
hand_cascade1 = cv2.CascadeClassifier(r"C:\Users\henri\AppData\Local\Programs\Python\Python37\Lib\site-packages\cv2\data\Hand_haar_cascade.xml")



def hands(frame):
    blur = cv2.GaussianBlur(frame, (5, 5), 0)  # BLURRING IMAGE TO SMOOTHEN EDGES
    gray = cv2.cvtColor(blur, cv2.COLOR_BGR2GRAY)  # BGR -> GRAY CONVERSION
    retval2, thresh1 = cv2.threshold(gray, 70, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)  # THRESHOLDING IMAGE
    hand = hand_cascade1.detectMultiScale(thresh1, 1.3, 5)  # DETECTING HAND IN THE THRESHOLDE IMAGE
    mask = np.zeros(thresh1.shape, dtype="uint8")  # CREATING MASK
    for (x, y, w, h) in hand:  # MARKING THE DETECTED ROI
        cv2.rectangle(frame, (x, y), (x + w, y + h), (122, 122, 0), 2)
        cv2.rectangle(mask, (x, y), (x + w, y + h), 255, -1)
    img2 = cv2.bitwise_and(thresh1, mask)
    final = cv2.GaussianBlur(img2, (7, 7), 0)
    contours, hierarchy = cv2.findContours(final, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

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


# VIDEO CAPTURE
# cap = cv2.VideoCapture(r"C:\Users\henri\Documents\Batia Zinger\פרוייקט\angular\projectAngular\src1\assets\Make_Body_Language_Your_Superpower.mp4")
# cap=cv2.VideoCapture(0)
# while 1:
#     ret, frame = cap.read()
#     frame=hands(frame)
#
#     cv2.imshow('img1', frame)
#
#     k = cv2.waitKey(30) & 0xff
#     if k == 27:
#         break
# cap.release()
# cv2.destroyAllWindows()



