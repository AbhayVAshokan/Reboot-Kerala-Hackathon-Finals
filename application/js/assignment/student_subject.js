// Get data from firebase
var assList = ['Make a Website for Super Humans lskdjflskdfj sldkfjlskdjf lskjdf ls', 'Create an app for video conferencing'],
    dueDates = [new Date(2020,12,23,13,30,0,0), new Date(2020,12,27,18,0,0,0)],
    assIds = ['a','b'];

    
const urlParams = new URLSearchParams(window.location.search);
const subName = urlParams.get('subName');
const teacher = urlParams.get('teachName');

document.getElementById("back-btn").onclick = ()=> {
    location.href = '../../html/assignment/student.html';
};

document.getElementById("subject-title").innerHTML = (`
    <h2>${subName}</h2>
`)
document.getElementById("subject-teacher").innerHTML = (`
    <h4>${teacher}</h4>
`)

document.getElementById("assignment-container").innerHTML = assIds.map((elem, index)=>{
    return (`
    <button type="button" class="list-group-item list-group-item-action" onclick="subject.openAssignment('${elem}')">
        <div class="d-flex justify-content-between flex-wrap">
            <h5 class="ass-list-elem">${assList[index]}</h5>
            <h6 class="text-right pt-1">Due on ${dueDates[index].toLocaleString('en-GB')}</h4>
        </div>
    </button>
    `)
}).join("");

module.exports.openAssignment = function openAssignment(id){
    location.href = `../../html/assignment/individual_subject.html?id=${id}&subName=${subName}&teachName=${teacher}`;
}