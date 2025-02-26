
const names = ["Ville", "Alla"];
const toDo = [];

    names.forEach((name, index) =>{
        console.log(`${index + 1}: ${name}`);
    }); 

    function print(input){
        if (input != "" && !toDo.includes(input)){
        const newDiv = document.createElement("div");
        newDiv;
        newDiv.appendChild(document.createTextNode(`${input}`));
        
        const button = document.createElement("button");
        button.textContent = "Remove";
        button.onclick = function(){
            remove(newDiv);
        };

        newDiv.appendChild(button);
        document.body.appendChild(newDiv);
        toDo.push(input);
    }
    else if (toDo.includes(input)){
        alert("This chore is alredy on your list");
    }
    else{
        alert("You need to enter a chore");
    }
    }
function remove(element){
    element.remove();
    toDo.pop(element);
}

function add(){
    let input = document.querySelector('input').value;
    print(input);
}

