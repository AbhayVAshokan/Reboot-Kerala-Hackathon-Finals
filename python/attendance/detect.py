import os
import cv2
import pickle
import numpy as np
import faceRecognition as fr


# This module captures images via webcam and performs face recognition
face_recognizer = cv2.face.LBPHFaceRecognizer_create()
face_recognizer.read('model.yml')  # Load saved training data

# Reading the labels
name = {}
with open('labels.pkl', 'rb') as f:
    name = pickle.load(f)

cap = cv2.VideoCapture(0)

while True:
    # captures frame and returns boolean value and captured image
    ret, test_img = cap.read()
    faces_detected, gray_img = fr.faceDetection(test_img, '../haarcascades/haarcascade_frontalface_default.xml')

    for (x, y, w, h) in faces_detected:
        cv2.rectangle(test_img, (x, y), (x+w, y+h), (255, 0, 0), thickness=7)

    resized_img = cv2.resize(test_img, (1000, 700))

    for face in faces_detected:
        (x, y, w, h) = face
        roi_gray = gray_img[y:y+w, x:x+h]
        label, confidence = face_recognizer.predict(
            roi_gray)  # predicting the label of given image
        print("confidence:", confidence)
        print("label:", label)
        fr.draw_rect(test_img, face)
        predicted_name = name[label]
        if confidence < 39:  # If confidence less than 37 then don't print predicted face text on screen
            fr.put_text(test_img, predicted_name, x, y)

    resized_img = cv2.resize(test_img, (1000, 700))
    cv2.imshow('Recognized Faces', resized_img)
    if cv2.waitKey(10) == ord('q'):  # wait until 'q' key is pressed
        break


cap.release()
cv2.destroyAllWindows
