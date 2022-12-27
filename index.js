const express = require("express")
const app = express()
const moviesRouter = require("./routers/movies")
const readRouter = require("./routers/read")

app.use("/movies", moviesRouter)
app.use("/movies/read", readRouter)


app.get('/', (req, res) => {
    res.json({message: "ok"})
})

app.get('/test', (req, res) => {
    res.json({status:200, message:"ok"})
})

app.get('/time', (req, res) => {
    let datetime = new Date()
    res.json({status:200, message: `${datetime.getHours()}:${datetime.getMinutes()}`})
})

app.get('/hello/:username', (req, res) => {
    res.json({status:200, message: `Hello, ${req.params.username}`})
})

app.get('/search', (req, res) => {
    console.log(req.query.s)
    if(req.query.s == "" || req.query.s == undefined) {
        console.log(req.query.s)
        res.json({status:500, error:true, message:"you have to provide a search" })
    } 
    else {
        res.json({status:200, message:"ok", data: req.query.s})
    }
})


app.listen(3000)

