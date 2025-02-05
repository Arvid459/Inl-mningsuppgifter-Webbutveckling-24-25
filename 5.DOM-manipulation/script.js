
function changeText(){
    document.querySelector('h1').innerHTML = "You pressed the button!";
}

function changeColor(){
    const bodyBgColor = document.body.style.backgroundColor;

    document.body.style.backgroundColor = (bodyBgColor === "black") ? "white" : "black";
}