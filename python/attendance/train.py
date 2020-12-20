import os
import sys
import pickle
import faceRecognition as fr

training_images = './training-images'
model = 'model.yml'
labels_path = 'labels.pkl'
cascade_path = '../haarcascades/haarcascade_frontalface_default.xml'

args = sys.argv
if len(args) > 1:
    cascade_path = args[1]
    training_images = args[2]
    model = args[3]
    labels_path = args[4]


# Generating labels
label = 0
labels = {}
for dir in os.listdir(training_images):
    labels[label] = dir

with open(labels_path, 'wb') as f:
    pickle.dump(labels, f, pickle.HIGHEST_PROTOCOL)

faces, faceID = fr.labels_for_training_data(training_images, labels_path, cascade_path)
face_recognizer = fr.train_classifier(faces, faceID)
face_recognizer.write(model)