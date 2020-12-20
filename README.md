# Reboot Kerala Hackathon Finals 2020
>An application for connecting teachers with students.

### Problem Statement
The education segment was drastically impacted due to the pandemic. The whole system had to be channeled from a physical classroom to a completely online form of training. Though the new system has its advantages, it has major drawbacks such as limitation of interactiveness and  inability for a teacher  to clearly monitor the activity of a student and his/her attentiveness in class. Design/develop/improve the online training platform with considerations on better interactivity, monitorability and gauge their level of understanding during class. The solution should also consider the scope of improving the online examination system.

> This is one of the two repos contributing to our Reboot Kerala Hackathon finals.

The registration website is developed using html, css, js and hosted in firebase hosting. A NodeJS server is used as backend.

The application is developed using electron.js.
Electron is an open-source software framework developed and maintained by GitHub. It allows for the development of desktop GUI applications using web technologies: it combines the Chromium rendering engine and the Node.js runtime.

## Registration
This is the website where the student registration is done. Images are captured during registration and are stored in `python/training-images/`. NodeJS server is used as backend to run the python script for face recognition.

<ul>
    <li>It depends on python/attendance module for face recognition.</li>
</ul>

### Face recognition
> python/attendance

Haarcascade classifier is used to crop out the faces from the live video capture. The images are trained using <a href="https://towardsdatascience.com/face-recognition-how-lbph-works-90ec258c3d6b">Local Binary Pattern Histogram</a> approach. It converts each set of images to a vector and compares the test image with the same as the distance between the two vectors. This distance is called the `confidence value`.

The code can by run independantly by simply running the python scripts.
The requirements are `opencv-python`, `opencv-contrib-python`, and `pickle`. 

The registration website can run the same script through the virtual python-shell by passing the relative paths are arguments. The webiste is hosted in firebase. 

### Blaze Application
#### Key Points
1. The application runs in full screen mode. Student cannot switch between the windows. ALso GUI applications have an advantage over browser applications. Browser applications cannot run complex machine learning modules due to the lack of enough resources.
2. An animated video about the application is provided in the dashboard to provide more detailed explanation.
3. The students can track their subject-wise attendance, submit assignments, vand iew course materials.

There are much more features. Simply run the following commands to setup.

### Setup
```
cd application
npm install
npm start
```
