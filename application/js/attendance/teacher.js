// Fetch class list
var classes = ['Class 1', 'Class 2'];

document.getElementById("back-btn").onclick = ()=> {
    location.href = '../../html/index.html';
};

function openClass(className){
    location.href = `../../html/attendance/teacher_class.html?className=${className}`;
}

document.getElementById('class-container').innerHTML = classes.map((el,index)=>{
    return (`
        <div class="card class-container mx-3 my-2" onclick="openClass('${el}')">
            <div class="card-title text-center">${el}</div>
            <div class="card-body">43 Students</div>
        </div>
    `);
}).join("");
