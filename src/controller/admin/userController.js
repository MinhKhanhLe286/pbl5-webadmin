// GET user
const userController = (req, res) => {
  const userData = {
    username: "khanh",
    fullName: "Trần Phước Phú",
    email: "tranphuocphukanija@gmail.com",
    phone: "0334467772",
    role: "admin",
  };
  res.render("admin/user", { user: userData });
};

module.exports = {
  userController,
};
