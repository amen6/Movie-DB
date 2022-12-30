const express = require('express');
const router = express.Router();

let movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

router.get("/create", (req, res) => {  
    let movie = req.query;
    const checkMovie = obj => obj.title === movie.title;
    if(!movie.title || movie.year.length != 4 || isNaN(movie.year)) {
        res.status(403)
        .json({status:403, error:true, message:'you cannot create a movie without providing a title and a year'})
    }
    else if(movies.some(checkMovie)) {
        res.status(400)
        .json({status:400, error:true, message:'movie name is already used'})
    } 
    else if(parseFloat(movie.rating) > 10) {
        let newMovie = {
            title: movie.title,
            year: parseInt(movie.year),
            rating: 10
        };
        movies.push(newMovie);
        res.status(200).json({message: movies})
    }
    else {
        let newMovie = {
            title: movie.title,
            year: parseInt(movie.year),
            rating: parseFloat(movie.rating) || 4
        };
        movies.push(newMovie);
        res.status(200).json({message: movies})
    }
})

router.get("/read", (req, res) => {
    res.json({status:200, data: movies})
})

router.get("/update/:name", (req, res) => {
    let toModifyMovieName = capitalizeFirstLetter(req.params.name);
    let modifiedMovie = req.query;
    let movieName = capitalizeFirstLetter(req.params.name);
    const checkMovie = obj => obj.title === toModifyMovieName;
    if(movies.some(checkMovie)) {
        let movieIndex = movies.findIndex(checkMovie);
        if(modifiedMovie.title)  movies[movieIndex].title = capitalizeFirstLetter(modifiedMovie.title); 
        if(modifiedMovie.year)  movies[movieIndex].year = parseInt(modifiedMovie.year); 
        if(modifiedMovie.rating) {
            let newRating = parseFloat(modifiedMovie.rating);
            if(newRating > 10 || newRating < 0) {
                res.status(400)
                .json({status:400, error:true, message:'Rating value is not suitable, rating chould be between 0 and 10'})
            }
            else {
                movies[movieIndex].rating = newRating;
            }
            
        }   
        res.status(200).json({message: movies})
    } 
    else {
        res.status(404).json({status:404, error:true, message:`the movie ${movieName} does not exist`})
    }
})

router.get("/delete/:name", (req, res) => {
    let movieName = capitalizeFirstLetter(req.params.name);
    const checkMovie = obj => obj.title === movieName;
    if(movies.some(checkMovie)) {
        movies = movies.filter(movie => movie.title !== movieName)
        res.status(200).json({message: movies})
    } 
    else {
        res.status(404).json({status:404, error:true, message:`the movie ${movieName} does not exist`})
    }
})

module.exports = {
    router, movies
};