document.addEventListener("DOMContentLoaded", () => {
  const user = {
    username: "tranphuocphu",
    fullName: "Trần Phước Phú",
    email: "tranphuocphukanija@gmail.com",
    phone: "0334467772",
    role: "admin",
  };
  document.getElementById("username").textContent = user.username;
  document.getElementById("full-name").textContent = user.fullName;
  document.getElementById("email").textContent = user.email;
  document.getElementById("phone").textContent = user.phone;
  document.getElementById("role").textContent = user.role;
});
