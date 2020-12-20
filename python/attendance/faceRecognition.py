import cv2
import os
import pickle
import numpy as np

# This module contains all common functions that are called in tester.py file


# Given an image below function returns rectangle for face detected alongwith gray scale image
def faceDetection(test_img, cascade_path):
    # convert color image to grayscale
    gray_img = cv2.cvtColor(test_img, cv2.COLOR_BGR2GRAY)
    face_haar_cascade = cv2.CascadeClassifier(
        cascade_path)  # Load haar classifier
    faces = face_haar_cascade.detectMultiScale(
        gray_img, scaleFactor=1.32, minNeighbors=5)  # detectMultiScale returns rectangles

    return faces, gray_img

# Given a directory below function returns part of gray_img which is face alongwith its label/ID


def labels_for_training_data(directory, labels_path, cascade_path):
    if labels_path == None:
        labels_path = 'labels.pkl'

    faces = []
    faceID = []
    name = {}
    with open(labels_path, 'rb') as f:
        name = pickle.load(f)

    for path, subdirnames, filenames in os.walk(directory):
        for filename in filenames:
            if filename.startswith("."):
                # Skipping files that startwith .
                print("Skipping system file")
                continue

            id = os.path.basename(path)  # fetching subdirectory names
            label = None
            for l in name:
                if name[l] in id:
                    label = l
                    break

            img_path = os.path.join(path, filename)  # fetching image path
            print("img_path:", img_path)
            print("id:", id)
            test_img = cv2.imread(img_path)  # loading each image one by one
            if test_img is None:
                print("Image not loaded properly")
                continue
            # Calling faceDetection function to return faces detected in particular image
            faces_rect, gray_img = faceDetection(test_img, cascade_path)
            if len(faces_rect) != 1:
                continue  # Since we are assuming only single person images are being fed to classifier
            (x, y, w, h) = faces_rect[0]
            # cropping region of interest i.e. face area from grayscale image
            roi_gray = gray_img[y:y+w, x:x+h]
            faces.append(roi_gray)
            # faceID.append(int(id))
            faceID.append(label)
    return faces, faceID


# Below function trains haar classifier and takes faces,faceID returned by previous function as its arguments
def train_classifier(faces, faceID):
    face_recognizer = cv2.face.LBPHFaceRecognizer_create()
    print(faceID)
    face_recognizer.train(faces, np.array(faceID))
    return face_recognizer

# Below function draws bounding boxes around detected face in image


def draw_rect(test_img, face):
    (x, y, w, h) = face
    cv2.rectangle(test_img, (x, y), (x+w, y+h), (255, 0, 0), thickness=5)

# Below function writes name of person for detected label


def put_text(test_img, text, x, y):
    cv2.putText(test_img, text, (x, y),
                cv2.FONT_HERSHEY_DUPLEX, 2, (255, 0, 0), 4)
