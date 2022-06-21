const express = require('express')
const pool = require("../connectMySQL")
const fileMiddleware = require("../middleware/cover_film")
const router = express.Router()

router.post("/film/upload", fileMiddleware.single('cover'),(req, res) => {
    try{
        const {name, description, genre, director, year, country} = req.body
        const cover = req.file
        pool.query("INSERT INTO `films` (`name`, `description`, `genre`, `director`, `year`, `country`, `cover`, `estimation`) VALUES (?, ?, ?, ?, ?, ?, ?, 0)",
        [name, description, genre, director, year, country, cover.path], function(err, result){
            if(err) throw err
                res.json(true)
        })
    }catch (e) {
        
    }
})

router.post("/film/change-text",(req, res) => {
    try{
        const {name, description, genre, director, year, country, id_film} = req.body
        pool.query("UPDATE `films` SET `name` = ?, `description` = ?, `genre` = ?, `director` = ?, `year` = ?, `country` = ? WHERE id = ?",
            [name, description, genre, director, year, country, id_film], function(err, result){
                if(err) throw err
                res.json(true)
            })
    }catch (e) {

    }
})

router.post("/film/change-img", fileMiddleware.single('cover'),(req, res) => {
    try{
        const cover = req.file
        const {id_film} = req.body
        pool.query("UPDATE `films` SET `cover` = ? WHERE id = ?", [cover.path, id_film], function(err, result){
                if(err) throw err
                res.json(true)
            })
    }catch (e) {

    }
})

router.post("/film/delete", (req, res) => {
    try{
        const {id_film} = req.body
        pool.query("DELETE FROM feedback WHERE id_film = ?", [id_film], function(err, result){
            if(err) throw err
            pool.query("DELETE FROM estimation WHERE id_film = ?", [id_film], function(err, result){
                if(err) throw err
                pool.query("DELETE FROM films WHERE id = ?", [id_film], function(err, result){
                    if(err) throw err
                    res.json(true)
                })
            })
        })


    }catch (e) {

    }
})

router.get("/film", (req, res) => {
    pool.query("SELECT * FROM films", function(err, result){
        if(err) throw err
        const films = result
        res.json({films})
    })
})

router.post("/film/current", (req, res) => {
    const {id_film} = req.body
    pool.query("SELECT * FROM films WHERE id = ?", [id_film], function(err, result){
        if(err) throw err
        const films = result[0]
        res.json({films})
    })
})


router.get("/user", (req, res) => {
    pool.query("SELECT * FROM users", function(err, result){
        if(err) throw err
        const users = result
        res.json({users})
    })
})
router.post("/user/delete", (req, res) => {
    const {id_user} = req.body
    pool.query("DELETE FROM estimation WHERE id_user = ?", [id_user], function(err, result){
        if(err) throw err
        pool.query("DELETE FROM feedback WHERE id_user = ?", [id_user], function(err, result){
            if(err) throw err
            pool.query("DELETE FROM users WHERE id = ?", [id_user], function(err, result){
                if(err) throw err
                res.json(true)
            })
        })
    })

})

module.exports = router