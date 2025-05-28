const apiKey = "bc042a71";
let allMovies = [];
const toDo = [];

function getMovies() {
  const searchTerm = document.getElementById("searchInput").value.trim();
  const content = document.getElementById("content");
  content.innerHTML = "";
  allMovies = [];

  if (!searchTerm) {
    alert("Please enter a movie title.");
    return;
  }

  const pageRequests = [];
  for (let i = 1; i < 3; i++) {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&page=${i}`;
    pageRequests.push(fetch(url).then((res) => res.json()));
  }

  Promise.all(pageRequests)
    .then((responses) => {
      responses.forEach((data) => {
        if (data.Response === "True") {
          allMovies = allMovies.concat(data.Search);
        }
      });

      if (allMovies.length > 0) {
        displayMovies(allMovies);
      } else {
        content.innerHTML = "<p>No movies found.</p>";
      }
    })
    .catch((error) => {
      console.error("Something went wrong:", error);
    });
}

function displayMovies(movies) {
  const content = document.getElementById("content");
  content.innerHTML = "";

  movies.forEach((movie, index) => {
    const box = document.createElement("div");
    box.className = "box";

    box.innerHTML = `
            <img src="${
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://dummyimage.com/200x300?text=No+Image"
            }" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        `;

    box.addEventListener("click", () => MovieAdd(index));
    content.appendChild(box);
  });
}

function MovieAdd(index) {
  const movie = allMovies[index];
  const name = movie.Title;

  if (toDo.includes(name)) {
    alert("This movie is already on your list.");
    return;
  } else {
    alert("Movie is successfully added.");
  }

  toDo.push(name);
  updateToDo();
}

function removeMovie(name) {
  const index = toDo.indexOf(name);
  if (index > -1) {
    toDo.splice(index, 1);
    updateToDo();
  }
}

function updateToDo() {
  const movieList = document.getElementById("movieList");
  movieList.innerHTML = "";

  //set local storage data
  localStorage.setItem("toDo", JSON.stringify(toDo));

  toDo.forEach((name) => {
    const li = document.createElement("li");
    li.textContent = name;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.onclick = () => removeMovie(name);

    li.appendChild(removeBtn);
    movieList.appendChild(li);
  });
}

//get local storage data
document.addEventListener("DOMContentLoaded", () => {
  const storedMovies = localStorage.getItem("toDo");
  if (storedMovies) {
    toDo.push(...JSON.parse(storedMovies));
    updateToDo();
  }
  document
    .getElementById("searchInput")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        getMovies();
      }
    });
  const searchBtn = document.getElementById("searchBtn");
  if (searchBtn) {
    searchBtn.addEventListener("click", getMovies);
  }
});
