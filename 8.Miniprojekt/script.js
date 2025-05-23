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

function logKey(event){
    pressedKeys.textContent = pressedKeys.textContent + event.key;
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

    document.addEventListener("keydown", function(event) {
        logKey(event);
    });

});




function displayMovies(movies) {
  const content = document.getElementById('content');
  content.innerHTML = ''; // Clear previous results

  movies.forEach(movie => {
    const box = document.createElement('div');
    box.className = 'box';
    box.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;
    content.appendChild(box);
  });
}




const apiKey = 'bc042a71'; 
const searchTerm = 'Batman';
const page = 1; 

function getMovies(){
fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&page=${page}`)
  .then(response => response.json())
  .then(data => {
    if (data.Response === "True") {
      console.log(data.Search); 
      displayMovies(data.Search)
    } else {
      console.log("Inga filmer hittades.");
    }
  })
  .catch(error => {
    console.error("Något gick fel:", error);
  });

}

getMovies()
  




