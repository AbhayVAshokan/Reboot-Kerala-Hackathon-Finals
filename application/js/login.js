function validate() {
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;
            if (username == null || username == "") {
                alert("Please enter the username.");
                return false;
            }
            if (password == null || password == "") {
                alert("Please enter the password.");
                return false;
            }
        window.location.href=" ";
        } 

function checkEmail() {

    var email = document.getElementById('txtEmail').value;
    var filter =  /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    

    if (!filter.test(email)) {
    alert('Please provide a valid email address!');
    email.focus;
    return false;
 }
            alert('Please check your email to reset your password.');
            location.href="home.html";
            return true;
}
