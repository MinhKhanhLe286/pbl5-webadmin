const router = require("express").Router()
router.get("/camera", (req,res)=>{
    res.render("admin/camera.ejs")
})

module.exports = router