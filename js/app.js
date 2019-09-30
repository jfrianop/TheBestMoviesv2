const fetchMovies = async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=3d7fd0461ae8d0f2e808c37fb41950d7')
    const jsonData = await response.json();
    return jsonData;
}

const displayMovies = (jsonData) => {
    const imgURL = "https://image.tmdb.org/t/p/w300"
    jsonData.results.forEach(movie => {
        displayMovie(imgURL + movie.poster_path, movie.original_title, movie.overview);
    });
}

const displayMovie = (img, title, description) => {
    $(".card-container").append('<div class="card m-3" style = "max-width: 18rem;" > <img src="' + img + '" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">' + title + '</h5><p class="card-text">' + description + '</p></div></div>')
}

const importMovies = () => {
    fetchMovies().then((e => {
        displayMovies(e);
    }))
}
$("#import").on("click", importMovies);