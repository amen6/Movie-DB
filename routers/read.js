const express = require('express');
const router = express.Router();
const moviesRouter = require("./movies")

let movies = moviesRouter.movies

router.get("/by-date", (req, res) => {    
    let moviesSortedByDate = movies.sort((a,b) => a.year - b.year);
    res.json({ status: 200, data: moviesSortedByDate });
})

router.get("/by-rating", (req, res) => {
    let moviesSortedByRating = movies.sort((a,b) => a.rating - b.rating);
    res.json({ status: 200, data: moviesSortedByRating });
})

router.get("/by-title", (req, res) => {
    let moviesSortedByTitle = movies.sort((a,b) => (a.title > b.title) - (b.title > a.title));
    res.json({ status: 200, data: moviesSortedByTitle });
})

router.get("/id/:name", (req, res) => {
    let requestedMovie = movies.filter((a) => a.title == req.params.name);
    if(requestedMovie.length == 0) {
        res.status(404).json({status:404, error:true, message:`the movie ${req.params.name} does not exist`})
    } 
    else {
        res.json({ status: 200, data: requestedMovie });
    }
})

module.exports = router;