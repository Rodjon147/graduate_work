require('dotenv').config()
const express = require('express')
const pool = require("../connectMySQL")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = express.Router()

router.post("/register",(req, res) => {
        try{
            const {email, username, password, confirmPassword} = req.body
            let mailRegex = /^[a-zA-Z][a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/

            if(!email) return res.json({message: "Введите Ваш email"})
            if(!email.match(mailRegex)) return res.json({message: "Некорректный email"})
            if(!username) return res.json({message: "Введите логин"})
            if(!password) return res.json({message: "Введите пароль"})
            if(!confirmPassword) return res.json({message: "Повторите пароль"})
            if(password != confirmPassword) return res.json({message: "Пароли не совпадают"})


            pool.query(`SELECT * FROM users WHERE email = ? OR username = ?`,[email, username], function(err, result){
                if(err) throw err
                if(result.length > 0){
                    return res.json({message: "Такой пользователь уже существует"})
                }else{
                    const hashPassword = bcrypt.hashSync(password, 7)
                    pool.query(`INSERT INTO users(email, username, password, role) VALUES (?, ?, ?, 'user')`,[email, username, hashPassword], function(err, result){
                        pool.query(`SELECT * FROM users WHERE email = ?`,email, function(err, result){
                            if(result.length){
                                const user = result[0]

                                const token = jwt.sign({id: user.id, email: user.email, username: user.username, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'})
                                return res.json({
                                    token,
                                    user
                                })
                            }
                        })

                    })
                }
            })


        }catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.post("/login",(req, res) => {
        try{
            const {email, password} = req.body
            let mailRegex = /^[a-zA-Z][a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/

            if(!email) return res.json({message: "Введите Ваш email"})
            if(!email.match(mailRegex)) return res.json({message: "Некорректный email"})
            pool.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
                if (err) throw err
                if(result.length){
                    const user = result[0]
                    if(bcrypt.compareSync(password, result[0].password)){
                        const token = jwt.sign({id: user.id, email: user.email, username: user.username, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'})
                        return res.json({
                            token,
                            user
                        })
                    }else{
                        return res.json({message: "Пароль введён неверно"})
                    }
                }else{
                    return res.json({message: "Пользователь не найден"})
                }
            })
        }catch (e) {
            console.log(e)
            return res.status(400).json({message: "Ошибка авторизации"})
        }
})

module.exports = router