require('dotenv').config()
const express = require('express')
const pool = require("../connectMySQL")
const router = express.Router()

router.post("/get/:id_film",(req, res) => {
    try{
        const {id_user} = req.body
        const id_film = req.params.id_film
        pool.query("SELECT *, (SELECT estimation FROM estimation WHERE id_film = ? and id_user = ?) as estimations FROM films WHERE id = ?", [id_film, id_user, id_film], (err, result) => {
            if (err) throw err
            const film = result[0]
            res.json({film})
        })
    }catch (e) {
    }
})

router.post("/estimation",(req, res) => {
    try{
        const {est, id_film, id_user} = req.body

        pool.query("INSERT INTO `estimation` (`estimation`, `id_film`, `id_user`) VALUES ( ?, ?, ?)", [est, id_film, id_user], (err, result) => {
            if (err) throw err
            pool.query("SELECT ROUND(SUM(estimation)/COUNT(estimation), 1) AS estimation, (SELECT COUNT(estimation) FROM estimation WHERE id_film = ?) as countreview FROM estimation WHERE id_film = ?",
                [id_film, id_film], (err, result) => {
                    if (err) throw err
                    const estData = result[0]
                    pool.query("UPDATE `films` SET `estimation` = ?, `countUsers` = ? WHERE `id` = ?",
                        [estData.estimation, estData.countreview, id_film], (err, result) => {
                            if (err) throw err
                            pool.query("SELECT *, (SELECT estimation FROM estimation WHERE id_film = ? and id_user = ?) as estimations FROM films WHERE id = ?",
                                [id_film, id_user, id_film], (err, result) => {
                                    if (err) throw err
                                    const film = result[0]
                                    res.json({film})
                                })
                        })
                })

        })
    }catch (e) {
        console.log(e)
    }
})

router.post("/delete",(req, res) => {
    try{
        const {id_film, id_user} = req.body
        pool.query("DELETE FROM `estimation` WHERE id_film = ? AND id_user = ?", [id_film, id_user], (err, result) => {
            if (err) throw err
            pool.query("SELECT ROUND(SUM(estimation)/COUNT(estimation), 1) AS estimation, (SELECT COUNT(estimation) FROM estimation WHERE id_film = ?) as countreview FROM estimation WHERE id_film = ?",
                [id_film, id_film], (err, result) => {
                    if (err) throw err
                    const estData = result[0]
                    pool.query("UPDATE `films` SET `estimation` = ?, `countUsers` = ? WHERE `id` = ?",
                        [estData.estimation, estData.countreview, id_film], (err, result) => {
                            if (err) throw err
                            pool.query("SELECT *, (SELECT estimation FROM estimation WHERE id_film = ? and id_user = ?) as estimations FROM films WHERE id = ?",
                                [id_film, id_user, id_film], (err, result) => {
                                    if (err) throw err
                                    const film = result[0]
                                    res.json({film})
                                })
                        })
                })
        })
    }catch (e) {
        console.log(e)
    }
})

module.exports = router