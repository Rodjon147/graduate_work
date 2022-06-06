require('dotenv').config()
const express = require('express')
const pool = require("../connectMySQL")
const router = express.Router()

router.post("/get",(req, res) => {
    try{
        const {id_film} = req.body
        pool.query("SELECT *, (SELECT name FROM users WHERE id = feedback.id_user) as name, (SELECT avatar FROM users WHERE id = feedback.id_user) as avatar, (SELECT id FROM users WHERE id = feedback.id_user) as id_user FROM feedback WHERE id_film = ?", [id_film], (err, result) => {
            if (err) throw err
            const feedback = result
            res.json({feedback})
        })
    }catch (e) {
        console.log(e)
    }
})

router.post("/add",(req, res) => {
    try{
        const {feedback, id_film, id_user} = req.body
        const date = new Date(Date.now())
        const fullFate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        pool.query("INSERT INTO `feedback` (`feedback`, `id_film`, `id_user`, `date`) VALUES ( ?, ?, ?, ?)", [feedback, id_film, id_user, fullFate], (err, result) => {
            if (err) throw err
            res.json(true)
        })
    }catch (e) {
        console.log(e)
    }
})

router.post("/delete",(req, res) => {
    try{
        const {id_feedback, id_film} = req.body

        pool.query("DELETE FROM `feedback` WHERE `id` = ?", [id_feedback], (err, result) => {
            if (err) throw err
            pool.query("SELECT *, (SELECT name FROM users WHERE id = feedback.id_user) as name, (SELECT avatar FROM users WHERE id = feedback.id_user) as avatar, (SELECT id FROM users WHERE id = feedback.id_user) as id_user FROM feedback WHERE id_film = ?", [id_film], (err, result) => {
                if (err) throw err
                const feedback = result
                res.json({feedback})
            })
        })
    }catch (e) {
        console.log(e)
    }
})

module.exports = router