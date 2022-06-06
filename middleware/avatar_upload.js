const multer = require("multer")

const storage = multer.diskStorage({
    destination(req, file, callback){
        callback(null, "public/avatar/")
    },
    filename(req, file, callback){
        callback(null, Date.now() + '-' + file.originalname)
    }
})

const types = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']

const fileFilter = (req, file, callback) => {
    if(types.includes(file.mimetype)){
        callback(null, true)
    }else{
        callback(null, false)
    }
}

module.exports = multer(({storage, fileFilter}))