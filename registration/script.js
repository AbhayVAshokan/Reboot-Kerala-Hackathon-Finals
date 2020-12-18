// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAc2GssH-5xWd-3pzdSs1fD0kHoh7fhvOU",
  authDomain: "reboot-kerala-hackathon-finals.firebaseapp.com",
  projectId: "reboot-kerala-hackathon-finals",
  storageBucket: "reboot-kerala-hackathon-finals.appspot.com",
  messagingSenderId: "279772278015",
  appId: "1:279772278015:web:5e24db524c7adf0dc470ca",
  measurementId: "G-0VJ08KR0KW",
};

// Initialize Cloud Firestore through Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

let labeledFaceDescriptors;
const input = document.getElementById("myfile");

Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
  faceapi.nets.ssdMobilenetv1.loadFromUri("./models"),
]).then(start);

async function start() {
  console.log("loaded");

  input.style.display = "block";
}

async function uploadData(
  name,
  email,
  regno,
  dept,
  collegeid,
  mobile,
  labeledFaceDescriptors
) {
  try {
    await db.collection(collegeid).doc(regno).set({
      name: name,
      dept: dept,
      collegeid: collegeid,
      mobile: mobile,
      email: email,
      labeledFaceDescriptors: labeledFaceDescriptors,
    });

    reg_form.reset();
  } catch (e) {
    alert(e);
  }
}

const reg_form = document.getElementById("registration-form");
reg_form.addEventListener("submit", submitForm);

function loadLabeledImages() {
  const labels = [document.getElementById("name").value];

  return Promise.all(
    labels.map(async (label) => {
      const descriptions = [];

      const images = input.files;
      console.log(images);

      for (let i = 0; i < images.length; i++) {
        try {
          const image = await faceapi.bufferToImage(images[i]);

          const detections = await faceapi
            .detectSingleFace(image)
            .withFaceLandmarks()
            .withFaceDescriptor();
          console.log("de", detections);
          descriptions.push(detections.descriptor);
        } catch (error) {}
      }

      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
}

async function submitForm(e) {
  e.preventDefault();

  const labeledFaceDescriptors = await loadLabeledImages();

  console.log("op", labeledFaceDescriptors);

  let desc = {};

  labeledFaceDescriptors[0].descriptors.forEach((d, i) => {
    desc[i] = { ...d };
  });

  desc["label"] = labeledFaceDescriptors[0].label;
  console.log("uplo", desc);

  const name = document.getElementById("name").value;
  const regno = document.getElementById("regno").value;
  const dept = document.getElementById("dept").value;
  const collegeid = document.getElementById("collegeid").value;
  const mobile = document.getElementById("mobile").value;
  const email = document.getElementById("email").value;

  uploadData(name, email, regno, dept, collegeid, mobile, desc);
}

document.getElementById("capture-btn").onclick = startPythonScript;

async function startPythonScript(event) {
  event.preventDefault();
  try {
    const response = await fetch("http://localhost:3000/start", {
      method: "POST",
    });
    // alert('Training Complete');
  } catch (e) {
    console.log(e);
  }
}
