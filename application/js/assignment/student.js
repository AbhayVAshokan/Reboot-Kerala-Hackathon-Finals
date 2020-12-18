
var classes = ['PP', 'DC', 'CSA'];
var teachers = ['Valsaraj', 'Aman', 'Ajay'];
var notifs = {
    PP:[new Date(2020,11,20,14,45,0,0), new Date(2020,11,20,14,45,0,0), new Date(2020,11,20,14,45,0,0)],
    DC:[],
    CSA:[new Date(2020,11,23,10,30,0,0)],
};
document.getElementById("back-btn").onclick = ()=> {
    location.href = '../../html/index.html';
};

module.exports.openClass = function openClass(className, teacher){
    location.href = `../../html/assignment/student_subject.html?subName=${className}&teachName=${teacher}`;
}

var classContainer = document.getElementById("class-container");
if(classContainer){
    classContainer.innerHTML = classes.map((el,index)=>{
        let notifList = notifs[el].map((elem)=>{
            return (
                "<li>Assignment due on "+elem.toLocaleString('en-GB')+"</li>"
            );
        }).join("");
        return (`
        <div class="card class-cards" onclick="student.openClass('${el}', '${teachers[index]}')">
            <img src="../../assets/images/default_class2.webp" class="card-img-top" alt="...">
            <img src="../../assets/images/user.jpg" class="profile-pic" alt="User">
            <h4 class="card-title class-name">${el}</h4>
            <h5 class="card-title class-teacher">${teachers[index]}</h5>
            <div class="card-text">
                <ul class="class-tasks my-0">
                    ${notifList}
                </ul>
            </div>
        </div>
        `)
    }).join("");
}