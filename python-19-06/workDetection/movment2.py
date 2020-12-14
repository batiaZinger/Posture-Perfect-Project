import cv2
import time
import datetime
import numpy as np
from sys import exit

display = True
i = 0
arr = [0, 0]


def diffImg(t0, t1, t2):
    #חישוב טווח בין שתי נקודות
    d1 = cv2.absdiff(t2, t1)
    d2 = cv2.absdiff(t1, t0)
    #מחשבת את הצירוף לכל חיבור  של שני משתנים
    return cv2.bitwise_and(d1, d2)


def marcar_zonas(frame_mov, frame_original, a):
    frame_mov = cv2.GaussianBlur(frame_mov, (21, 21), 0)
    limites = cv2.threshold(frame_mov, 5, 255, cv2.THRESH_BINARY)[1]
    limites = cv2.dilate(limites, None, iterations=2)
    image, contours, hierarchy = cv2.findContours(limites.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    movimiento_detectado = False
    for c in contours:
        if cv2.contourArea(c) < 800:
            continue
        (x, y, w, h) = cv2.boundingRect(c)
        # print(x, y, w, h)
        cv2.rectangle(frame_original, (x, y), (x + w, y + h), (255, 0, 255), 1)
        movimiento_detectado = True

    if movimiento_detectado:
        a[4] += 1
        cv2.rectangle(frame_original, (2, 220), (185, 235), (0, 0, 0), -1)
        cv2.putText(frame_original, 'movment detect', (5, 230), cv2.FONT_HERSHEY_SIMPLEX, 0.35, (255, 255, 255))

    return frame_original



