const radio = document.getElementById("myRadio");
const username = document.getElementById("username");
const password = document.getElementById("password");
const pressedKeys = document.getElementById("pressedKeys");


function saveInformation(){
    if (username.value.trim() === "" || password.value.trim() === ""){
        alert("You need to enter both username and password");
    }
    else{
        localStorage.setItem("username", username.value);
        localStorage.setItem("password", password.value);
    }
}

document.addEventListener("DOMContentLoaded", function () {

    console.log(sessionStorage.getItem("radioChecked"));

    if (sessionStorage.getItem("radioChecked") === "true") {
        radio.checked = sessionStorage.getItem("radioChecked");
    }

    if (localStorage.getItem("username") && localStorage.getItem("password")){
        username.value = localStorage.getItem("username");
        password.value = localStorage.getItem("password");
    }

    // Store the checked state when clicked
    radio.addEventListener("click", function () {
        sessionStorage.setItem("radioChecked", radio.checked);
    });

});




//session