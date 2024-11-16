const routerUser = require("express").Router();

routerUser.get("/user", (req,res)=>{
    res.render("admin/user")
})

module.exports = routerUser;