const express = require('express');
const router = express.Router();

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

router.get("/create", (req, res) => {    
    res.json({message: "create"})
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