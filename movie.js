const remote = require('electron').remote;
const shell = require('electron').shell
const service = require('./services.js');

$(document).ready(function() {

    // Header Controls

    $(".winclose").click(function() {
        var window = remote.getCurrentWindow();
        window.close();
    });

    $(".winmax").click(function() {
        var window = remote.getCurrentWindow();
        if (!window.isMaximized()) {
            window.maximize();
        } else {
            window.unmaximize();
        }
    });
    

    $(".winmini").click(function() {
        var window = remote.getCurrentWindow();
        window.minimize();
    });

    $(".back").click(function() {
        window.location.href = 'index.html';
    });
    //mainWindow.webContents.openDevTools()
    // Main Functions
   
   const parameters = new URLSearchParams(window.location.search);
    var imdb = parameters.get('imdb');
    
    service.getMovie(imdb)
       .then(function(response) {
            var movie = response.data;
            if (movie.Response == 'True') {
                if (movie.Poster != 'N/A') {$('#poster').attr("src", movie.Poster);} else {$('#poster').attr("src", './assets/img/defaultPoster.jpg')}
                $('.title').text(movie.Title);
                $('.year').text(movie.Year);
                $('.genre').text(movie.Genre);
                if (movie.imdbRating != 'N/A') {
                    $('.rating').append(GetStars(movie.imdbRating))
                    $('.imdb').html('<span>IMDB Rating</span> &nbsp;' + movie.imdbRating + ' <span class="rate">/10</span>')
                } else {
                    $('.rating').hide()
                }

                if (movie.Plot != 'N/A'){$('.plot').text(movie.Plot).show()}

                if (movie.Director != 'N/A') {$('.director').html('<span>Director</span> &nbsp;' + movie.Director).show()}
                if (movie.Writer != 'N/A'){$('.writer').html('<span>Writer</span> &nbsp;' + movie.Writer).show()}
                if (movie.Actors != 'N/A'){$('.actors').html('<span>Cast</span> &nbsp;' + movie.Actors).show()}

                if (movie.Metascore != 'N/A'){$('.metascore').html('<span>Metascore</span> &nbsp;' + movie.Metascore + ' <span class="rate">/100</span>').show()}
            }
        })
        .catch(function(error) {
            console.log(error);
        });

    $(".loader").fadeOut("slow");
    $('.btn-imdb').click(function() {
        shell.openExternal("https://www.imdb.com/title/" + imdb)
    });

});

function GetStars(rating) {
    var filled = '<i class="fa fa-star"></i>';
    var half = '<i class="fa fa-star-half-o"></i>';
    var empty = '<i class="fa fa-star-o"></i>';

    var filledStars = Math.floor(rating / 2);
    var emptyStars = 5 - filledStars;
    var totalStars = '';

    for (i = 0; i < filledStars; i++) {
        totalStars += filled;
    }
    if ((rating % 1).toFixed(1) > 0.4) {
        totalStars += half;
        emptyStars -= 1;
    }
    for (i = 0; i < emptyStars; i++) {
        totalStars += empty;
    }
    return totalStars;
}
