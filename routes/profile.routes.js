const express = require('express')
const pool = require("../connectMySQL")
const fileUploads = require("../middleware/avatar_upload")
const router = express.Router()

router.post("/get",(req, res) => {
    try{
        const {id_user} = req.body
        pool.query("SELECT name, email, avatar, (SELECT COUNT(*) FROM estimation WHERE id_user = ?) as count_est FROM `users` WHERE id = ?",[id_user, id_user], function(err, result){
            if(err) throw err
            if(result.length > 0){
                const user = result[0]
                return res.json({user})
            }
        })
    }catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.post("/uploads",fileUploads.single("avatar"),(req, res) => {
    try{
        const avatar = req.file
        const {id_user} = req.body
        pool.query("UPDATE `users` SET `avatar` = ? WHERE `id` = ?",[avatar.path, id_user], function(err, result){
            if(err) throw err
            const img = avatar.path
            res.json({img})
        })
    }catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.post("/delete",(req, res) => {
    try{
        const {id_user} = req.body
        pool.query("UPDATE `users` SET `avatar` = 'null' WHERE `id` = ?", [id_user], function(err, result){
            if(err) throw err
            const img = "null"
            res.json({img})
        })
    }catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.post("/change",(req, res) => {
    try{
        const {name, email, id_user} = req.body
        pool.query("UPDATE `users` SET name = ?, email = ? WHERE `id` = ?", [name, email, id_user], function(err, result){
            if(err) throw err
            res.json(true)
        })
    }catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})



module.exports = router