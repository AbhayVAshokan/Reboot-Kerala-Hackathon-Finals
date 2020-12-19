
const urlParams = new URLSearchParams(window.location.search);
const subName = urlParams.get('subName');
const assId = urlParams.get('id');
const teacher = urlParams.get('teachName');

var uploadFiles = [],
    docListContainer = document.getElementById("doc-container");

document.getElementById("back-btn").onclick = ()=> {
    location.href = `../../html/assignment/student_subject.html?subName=${subName}&teachName=${teacher}`;
};

// Check if file is present in list
function fileNotPresent(fileBlob){
    for(let i = 0; i < uploadFiles.length; i++){
        if(uploadFiles[i].name === fileBlob.name
            && uploadFiles[i].type === fileBlob.type
            && uploadFiles[i].lastModified === fileBlob.lastModified
            && uploadFiles[i].size === fileBlob.size){
                return false;
            }
    }
    return true;
}

// Add files to list
var fileUpload = document.getElementById("file-upload");

fileUpload.onchange = (input)=>{
    if(input.target.files[0]){
        for (let i = 0; i < input.target.files.length; i++) {
            if(fileNotPresent(input.target.files[i])){
                uploadFiles.push(input.target.files[i]);
                updateDocList(input.target.files[i]);
            }
        }
    }
    fileUpload.value = '';
    
}

// Remove Documents from list
module.exports.removeDocument = function removeDocument(i){
    uploadFiles.splice(i,1);
    docListContainer.innerHTML = uploadFiles.map((file, pos)=>{
        return(`
            <div class="doc-item card">
                <div class="row">
                    <div class="col col-sm-1 cross-cont">
                        ${getImage(file)}
                    </div>
                    <div class="col col-sm-9 cross-cont">
                        <p>${file.name}</p>
                    </div>
                    <div class="col col-sm-2 px-0 cross-cont">
                        <button class="btn " onclick="indivSubject.removeDocument(${pos})"><i class="fa fa-times"></i></button>
                    </div>
                </div>
            </div>
        `);
    }).join("")
}

// Update lists
function updateDocList(file){
    let pos = uploadFiles.length-1;
    docListContainer.insertAdjacentHTML('beforeend', `
    <div class="doc-item card">
        <div class="row">
            <div class="col col-sm-1 cross-cont">
                ${getImage(file)}
            </div>
            <div class="col col-sm-9 cross-cont">
                <p>${file.name}</p>
            </div>
            <div class="col col-sm-2 px-0 cross-cont">
                <button class="btn " onclick="indivSubject.removeDocument(${pos})"><i class="fa fa-times"></i></button>
            </div>
        </div>
    </div>
    `)
}

// Get the icon for the document
function getImage(file){
    let fileName = file.name, iconClass = "";
    if(fileName.match(/.(jpg|jpeg|png|gif)$/i)){
        return `
            <img
                style="width : 50px;"
                src="${URL.createObjectURL(file)}"
                alt=""
            ></img>
        `
    }
    else if(fileName.match(/.(pdf)$/i)){
        iconClass = "fa-file-pdf-o";   
    }
    else if(fileName.match(/.(doc|docx|odt)$/i)){
        iconClass = "fa-file-word-o";
    }
    else if(fileName.match(/.(txt|rtf|csv|json|log)$/i)){
        iconClass = "fa-file-text-o";
    }
    else if(fileName.match(/.(ppt|pptx|odp)$/i)){
        iconClass = "fa-file-powerpoint-o";
    }
    else if(fileName.match(/.(xls|xlsx|ods)$/i)){
        iconClass = "fa-file-excel-o";
    }
    else{
        iconClass = "fa-file-o";
    }
    return (
        `<i class="fa ${iconClass}"></i>`
    )
}