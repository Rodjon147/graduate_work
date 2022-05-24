require('dotenv').config()
const express = require("express")

const app = express()
const PORT = process.env.PORT || 8000
app.use('/public', express.static('public'))
app.use(express.json({extended: true}))
app.use('/', require("./routes/auth.routes"))
app.use('/manager', require("./routes/manager.routes"))

app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port`)
})
