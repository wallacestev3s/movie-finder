const key ='1b5afe89';
function getMovies(searchValue, typeValue) {
        return axios.get('http://www.omdbapi.com/',{params: {s: searchValue, type: typeValue, apikey:key }})
    }
    function getMovie(imdb){
        return axios.get('http://www.omdbapi.com/',{params: {i: imdb, apikey:key }})
    }
    module.exports = {getMovies, getMovie};

