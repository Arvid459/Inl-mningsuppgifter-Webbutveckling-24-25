const apiKey = "bc042a71";
let allMovies = [];
const toDo = [];

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
                : "https://via.placeholder.com/200x300?text=No+Image"
            }" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        `;

    box.addEventListener("click", () => handleMovieClick(index));
    content.appendChild(box);
  });
}

const searchBtn = document.getElementById("searchBtn");
if (searchBtn) {
  searchBtn.addEventListener("click", getMovies);
}

function getMovies() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.trim();
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

function handleMovieClick(index) {
  const movie = allMovies[index];
  const title = movie.Title;

  if (toDo.includes(title)) {
    alert("This movie is already on your list.");
    return;
  }

  toDo.push(title);
  updateToDo();
}

function removeMovieByTitle(title) {
  const index = toDo.indexOf(title);
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

  toDo.forEach((title) => {
    const li = document.createElement("li");
    li.textContent = title;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.onclick = () => removeMovieByTitle(title);

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
});
