const express = require('express');
const router = express.Router();

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

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

router.get("/update", (req, res) => {
    res.json({message: "create"})
})

router.get("/delete", (req, res) => {
    res.json({message: "create"})
})

module.exports = router;