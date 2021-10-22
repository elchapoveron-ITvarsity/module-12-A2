$(document).ready(function(){
    $("#email").blur(function(){
        emailvalidator();
    });
});

function emailvalidator(){
    var email = document.getElementById("email").value;
    if (localStorage.getItem(email) != null) {
        alert("Choose another email this is already available");
        $("#email").val(null);
    }
}