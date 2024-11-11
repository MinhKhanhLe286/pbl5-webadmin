
//GET[/admin/chat/]
function chatSocket(req, res){
    res.render("admin/chat.ejs")
}
module.exports = {
    chatSocket
}
