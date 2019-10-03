//GET popular movies from API
const fetchMovies = async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=3d7fd0461ae8d0f2e808c37fb41950d7')
    const jsonData = await response.json();
    return jsonData;
}

//GET details on specific Movie id
const fetchMovie = async (id) => {
    console.log("Fetching movie id " + id);
    const response = await fetch('https://api.themoviedb.org/3/movie/' + id + '?language=en-US&api_key=3d7fd0461ae8d0f2e808c37fb41950d7')
    const jsonData = await response.json();
    return jsonData;
}

//Uses fetch movies to return an array with ids of popular movies
const getPopularsId = async () => {
    const response = await fetchMovies();
    const idArr = response.results.map(movie => movie.id);
    return idArr;
}

//Receives id[] and prints every movie of each id
const displayMovies = (idArr) => {
    let test = [1, 2, 3, 4];
    console.log("Arrays to Display");
    console.log(idArr);
    console.log(test);
    const imgURL = "https://image.tmdb.org/t/p/w200";
    console.log("Item del arreglo: " + idArr[0])

    idArr.forEach(id => {
        console.log(id + 2)
        fetchMovie(id).then(movie => {
            displayMovie(imgURL + movie.poster_path, movie.original_title, movie.overview, movie.vote_average,
                movie.runtime, movie.relase_date, movie.genres[0].name, movie.id);
        })
    });
}


const displayMovie = (imgCode, title, description, score, duration, date, genre, id) => {
    var source = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);
    var context = { imgCode, title, description, score, duration, date, genre, id };
    var card = template(context);
    $(".card-container").append(card);
}

const importMovies = async () => {
    let moviesIds = await getPopularsId();
    displayMovies(moviesIds);
}
$(document).ready(importMovies);