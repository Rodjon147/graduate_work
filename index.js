require('dotenv').config()
const express = require("express")
const authRoutes = require("./routes/auth.routes")

const app = express()
const PORT = process.env.PORT || 8000
app.use(express.json({extended: true}))
app.use('/', authRoutes)

app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port`)
})
