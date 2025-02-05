const x = 5, y = 3;
let rnd1, rnd2, rnd3;

function sum( x, y){
    return x+y;
}

function changeColor(button){
    rnd1 = Math.floor(Math.random() * 255);
    rnd2 = Math.floor(Math.random() * 255);
    rnd3 = Math.floor(Math.random() * 255);
    button.style.backgroundColor = `rgb(${rnd1}, ${rnd2}, ${rnd3})`;
}

alert("check the sum function in the console");
console.log("summan av: " + x + "+" + y + " är " + sum(x,y));

