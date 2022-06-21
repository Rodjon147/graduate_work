require('dotenv').config()
const express = require("express")
const  cors = require("cors")

const app = express()
const PORT = process.env.PORT || 8000

app.use('/public', express.static('public'))
app.use(express.json({extended: true}))
app.use(cors())

app.use('/', require("./routes/auth.routes"))
app.use('/film', require("./routes/film.routes"))
app.use('/feedback', require("./routes/feedback.routes"))
app.use('/manager', require("./routes/manager.routes"))
app.use('/profile', require("./routes/profile.routes"))
app.use('/collection', require("./routes/collection.routes"))
app.use('/rating', require("./routes/rating.routes"))

app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port`)
})
