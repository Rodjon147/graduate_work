require('dotenv').config()
const express = require('express')
const pool = require("../connectMySQL")
const router = express.Router()

router.get("/get-main",(req, res) => {
    try{
        pool.query("SELECT films.*, (SELECT COUNT(feedback.id_film) FROM feedback WHERE feedback.id_film = films.id LIMIT 1) + (SELECT COUNT(estimation.id_film) FROM estimation WHERE estimation.id_film = films.id LIMIT 1) + films.estimation as countsEst FROM films ORDER BY countsEst DESC LIMIT 6", function(err, result){
            if(err) throw err
            const films = result
            res.json({films})
        })
    }catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.get("/get-current",(req, res) => {
    try{
        pool.query("SELECT films.*, (SELECT COUNT(feedback.id_film) FROM feedback WHERE feedback.id_film = films.id LIMIT 1) + (SELECT COUNT(estimation.id_film) FROM estimation WHERE estimation.id_film = films.id LIMIT 1) + films.estimation as countsEst FROM films ORDER BY countsEst DESC", function(err, result){
            if(err) throw err
            const films = result
            res.json({films})
        })
    }catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

module.exports = router