import sys
import os
import cv2
import numpy as np
from PIL import Image, ImageTk


def captureImages(reg_no, name, xml_path, image_path):
    """
    Arguments: 
        1. reg_no: Registration number of the student
        2. name: Name of the student
    Function takes 200 images for training.
        1. Read image from web cam
        2. Convert into greyscale
        3. Detect face using haarcascades
    """
    count = 0
    cap = cv2.VideoCapture(0)

    if xml_path is None:
        xml_path = '../haarcascades/haarcascade_frontalface_default.xml'

    if image_path is None:
        image_path = './training-images/'

    print(xml_path)
    print(image_path)

    face_cascade = cv2.CascadeClassifier(xml_path)

    if not os.path.exists(image_path + reg_no):
        os.makedirs(image_path + reg_no)

    while(True):
        _, img = cap.read()
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        face = None
        faces = face_cascade.detectMultiScale(gray, 1.2, 5)
        for (x, y, w, h) in faces:
            face = img[y: y + h, x: x + w]
            img = cv2.rectangle(img, (x, y), (x+w, y+h), (255, 255, 255), 1)
            cv2.putText(img, name, (x, y - 5),
                        cv2.FONT_HERSHEY_TRIPLEX, 0.5, (85, 224, 185), 1)

        cv2.putText(img, str((count + 1) // 2) + '%',
                    (img.shape[1] - 50, 20), cv2.FONT_HERSHEY_TRIPLEX, 0.75, (0, 221, 255))

        cv2.imshow('Capturing images', img)

        if face is not None and len(face) != 0:
            count += 1
            cv2.imwrite(image_path + reg_no +
                        '/image_' + str(count) + ".jpg", face)

        if count == 200 or cv2.waitKey(1) == ord('q'):
            break


# Command line arguments are required for running the python script via the NodeJS server.
args = sys.argv
if len(args) > 1:
    captureImages(reg_no=args[4], name=args[3],
                  xml_path=args[1], image_path=args[2])
else:
    captureImages(reg_no="17B201", name="Abhay V Ashokan",
                  xml_path=None, image_path=None)

