const express = require('express')
const pool = require("../connectMySQL")
const router = express.Router()

router.get("/get",(req, res) => {
    try{
        const {name, description} = req.body
        pool.query("SELECT * FROM collections", function(err, result){
            if(err) throw err
            if(result.length > 0){
                res.json({collections: result})
            }

        })
    }catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.post("/current",(req, res) => {
    try{
        const {id_coll} = req.body
        pool.query("SELECT * FROM collections WHERE id = ?", [id_coll], function(err, result){
            if(err) throw err
            if(result.length > 0){
                res.json({coll: result[0]})
            }

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
        pool.query("DELETE FROM collections WHERE id = ?", [id_coll], function(err, result){
            if(err) throw err
            res.json(true)
        })
    }catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

module.exports = router