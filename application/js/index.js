function navigateTo(dest) {
    location.href = dest;
}

document.getElementById('misha-btn').onclick = () => navigateTo('../html/login.html');
document.getElementById('abbas-btn').onclick = () => navigateTo('../html/classroom.html');
document.getElementById('riswana-btn').onclick = () => navigateTo('../html/attendance.html');
document.getElementById('shashi-btn').onclick = () => navigateTo('../html/course_materials.html');
document.getElementById('abhay-btn').onclick = () => navigateTo('../html/home.html');