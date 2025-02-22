
const names = ["Ville", "Alla"];
const toDo = [""];

    array.forEach((name, index) =>{
        console.log(`${index + 1}: ${name}`);
    }); 

    function print(input){
        const newDiv = document.createElement("div");
        newDiv;
        newDiv.appendChild(document.createTextNode(`${input}`));
        
        const button = document.createElement("button");
        newDiv.appendChild(button);
        button.textContent = "Remove";
        document.body.appendChild(newDiv);

    }


function add(){
    let input = document.querySelector('input').value;
    toDo.push(input);
    print(input);
}

