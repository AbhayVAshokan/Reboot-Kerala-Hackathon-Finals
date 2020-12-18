// Fetch class list
var classes = ['Class 1', 'Class 2'];

document.getElementById("back-btn").onclick = ()=> {
    location.href = '../../html/index.html';
};

module.exports.openClass = function openClass(className){
    location.href = `../../html/attendance/teacher_class.html?className=${className}`;
}

document.getElementById('class-container').innerHTML = classes.map((el,index)=>{
    return (`
        <div class="card class-cards mx-3 my-2" onclick="teacher.openClass('${el}')">
            <img src="../../assets/images/default_class2.webp" class="card-img-top" alt="...">
            <h4 class="card-title class-name">${el}</h4>
            <div class="card-body text-center">
                <h6>43 Students</h6>
            </div>
        </div>
    `);
}).join("");
