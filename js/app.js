//GET popular movies from API
const fetchMovies = async () => {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=3d7fd0461ae8d0f2e808c37fb41950d7')
    const jsonData = await response.json();
    return jsonData;
}

//GET details on specific Movie id
const fetchMovie = async (id) => {
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
    const imgURL = "https://image.tmdb.org/t/p/w200";

    idArr.forEach(id => {
        fetchMovie(id).then(movie => {
            displayMovie(imgURL + movie.poster_path, movie.original_title, movie.overview, movie.vote_average,
                movie.runtime, movie.relase_date, movie.genres[0].name, movie.id);
        })
    });
}

//Displays a movie given the data
const displayMovie = (imgCode, title, description, score, duration, date, genre, id) => {
    var source = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);
    var context = { imgCode, title, description, score, duration, date, genre, id };
    var card = template(context);
    $(".card-container").append(card);
}

//GET Video info given id
const getVideos = async (id) => {
    const response = await fetch('https://api.themoviedb.org/3/movie/' + id + '/videos?language=en-US&api_key=3d7fd0461ae8d0f2e808c37fb41950d7');
    const jsonData = response.json();
    return jsonData;
}

//Returns the key of the first Trailer found
const getTrailer = videos => {
    for (let i = 0; i < videos.length; i++) {
        if (videos[i].type == "Trailer") {
            return videos[i].key;
        }
    }
    return videos[0].key;
}

const putTrailer = (id) => {
    getVideos(id).then(e => {
        let trailerKey = getTrailer(e.results);
        $(".youtube").html('<iframe class="youtube-video" src="https://www.youtube.com/embed/' + trailerKey
            + '" frameborder="0"allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>')
        $("#trailer-modal").modal("show");
    })
}

const importMovies = async () => {
    $(".favorites").text(localStorage.getItem("favorites"));
    let moviesIds = await getPopularsId();
    displayMovies(moviesIds);

}

const saveFavorite = favoriteId => {
    let favorites = localStorage.getItem('favorites');
    favorites += '-' + favoriteId;
    localStorage.setItem('favorites', favorites)
}

$(document).ready(importMovies);

$(".card-container").on("click", ".card-trailer", function () {
    let movie = $(this).attr('movie-id');
    putTrailer(movie);
})

$(".card-container").on("click", ".card-addFavorite", function () {
    let id = $(this).attr('movie-id');
    saveFavorite(id);
})
$('#trailer-modal').on("hide.bs.modal", function () {
    $('.youtube-video').attr('src', '');
});
