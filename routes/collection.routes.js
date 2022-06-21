const express = require('express')
const pool = require("../connectMySQL")
const router = express.Router()

router.get("/get",(req, res) => {
    try{
        pool.query("SELECT *, (SELECT COUNT(id) FROM arrayfilms WHERE arrayfilms.id_collection = collections.id) as countcontent FROM collections", function(err, result){
            if(err) throw err
                res.json({collections: result})

        })
    }catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.post("/current",(req, res) => {
    try{
        const {id_coll} = req.body
        pool.query("SELECT *, (SELECT COUNT(id) FROM arrayfilms WHERE arrayfilms.id_collection = collections.id) as countcontent FROM collections WHERE id = ?", [id_coll], function(err, result){
            if(err) throw err
                res.json({coll: result[0]})

        })
    }catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.post("/add",(req, res) => {
    try{
        const {name, description} = req.body
        pool.query("INSERT INTO `collections` (`name`, `description`) VALUES (?, ?)", [name, description], function(err, result){
            if(err) throw err
            res.json(true)
        })
    }catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.post("/edit",(req, res) => {
    try{
        const {name, description, id_coll} = req.body
        pool.query("UPDATE collections SET name = ?, description = ? WHERE id = ?", [name, description, id_coll], function(err, result){
            if(err) throw err
            res.json(true)
        })
    }catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.post("/delete",(req, res) => {
    try{
        const {id_coll} = req.body
        pool.query("DELETE FROM arrayfilms WHERE id_collection = ?", [id_coll], function(err, result){
            if(err) throw err
            pool.query("DELETE FROM collections WHERE id = ?", [id_coll], function(err, result){
                if(err) throw err
                res.json(true)
            })
        })

    }catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.post("/add-content",(req, res) => {
    try{
        const {id_film, id_coll} = req.body
        pool.query("INSERT INTO arrayfilms (id_film, id_collection) VALUES(?, ?)", [id_film, id_coll], function(err, result){
            if(err) throw err
            res.json(true)
        })
    }catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.post("/content",(req, res) => {
    try{
        const { id_film, id_coll } = req.body
        pool.query("INSERT INTO arrayfilms (id_film, id_collection) VALUES (?, ?)",[id_film, id_coll], function(err, result){
            if(err) throw err
            res.json(true)

        })
    }catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.post("/delete-content",(req, res) => {
    try{
        const { id_film, id_coll } = req.body
        pool.query("DELETE FROM arrayfilms WHERE id_collection = ? AND id_film = ?",[id_coll, id_film], function(err, result){
            if(err) throw err
            res.json(true)

        })
    }catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.post("/film",(req, res) => {
    try{
        const { id_coll } = req.body
        pool.query("SELECT *, (SELECT id FROM arrayfilms WHERE arrayfilms.id_collection = ? AND arrayfilms.id_film = films.id) as content FROM `films`", [id_coll],function(err, result){
            if(err) throw err
            res.json({films: result})

        })
    }catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.get("/coll-film",(req, res) => {
    try{
        pool.query("SELECT (SELECT id FROM films WHERE films.id = arrayfilms.id_film) as id, (SELECT name FROM films WHERE films.id = arrayfilms.id_film) as name, (SELECT cover FROM films WHERE films.id = arrayfilms.id_film) as cover, (SELECT estimation FROM films WHERE films.id = arrayfilms.id_film) as estimation, (SELECT id FROM collections WHERE collections.id = arrayfilms.id_collection) as idCollection, (SELECT name FROM collections WHERE collections.id = arrayfilms.id_collection) as nameCollection, (SELECT description FROM collections WHERE collections.id = arrayfilms.id_collection) as descCollection FROM arrayfilms", function(err, result){
            if(err) throw err
                res.json({films: result})

        })
    }catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})


module.exports = router