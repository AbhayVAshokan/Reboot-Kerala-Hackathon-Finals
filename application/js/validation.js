function CheckPassword(inputtxt) {
    var passw = /^[A-Za-z]\w{7,14}$/;
    if (inputtxt.value.match(passw)) {
        alert('Correct, try another...')
        return true;
    }
    else {
        alert('Wrong...!')
        return false;
    }
}
function checkEmail() {

    var email = document.getElementById('email').value;
    var filter = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if (!filter.test(email)) {
        alert('Please provide a valid email address!');
        email.focus;
        return false;
    }
    alert('Please check your email to reset your password.');
}
function confirmPassword() {

    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;

    if (password != confirmPassword) {
        alert('Please enter the same password in confirm password');
        confirmPassword.focus;
        return false;
    }

}