// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAc2GssH-5xWd-3pzdSs1fD0kHoh7fhvOU",
    authDomain: "reboot-kerala-hackathon-finals.firebaseapp.com",
    projectId: "reboot-kerala-hackathon-finals",
    storageBucket: "reboot-kerala-hackathon-finals.appspot.com",
    messagingSenderId: "279772278015",
    appId: "1:279772278015:web:5e24db524c7adf0dc470ca",
    measurementId: "G-0VJ08KR0KW"
};

// Initialize Cloud Firestore through Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();


async function uploadData(name, email, regno, dept, collegeid, mobile) {
    try {
        await db.collection(collegeid).doc(regno).set({
            name: name,
            dept: dept,
            collegeid: collegeid,
            mobile: mobile,
            email: email,
        })

        reg_form.reset();
    } catch (e) {
        alert(e);
    }
}

const reg_form = document.getElementById('registration-form');
reg_form.addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const regno = document.getElementById('regno').value;
    const dept = document.getElementById('dept').value;
    const collegeid = document.getElementById('collegeid').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;

    uploadData(name, email, regno, dept, collegeid, mobile);
}

document.getElementById('capture-btn').onclick = startPythonScript;

async function startPythonScript(event) {
    event.preventDefault();
    try {
        const response = await fetch('http://localhost:3000/start', {
            method: 'POST'
        })
        // alert('Training Complete');
    } catch (e) {
        console.log(e);
    }
}