$(document).ready(function () {
  $("#password").val("");
  $("#username").focus();
  $("#password").val();
  $("#login-recognition").click(face);
  $("#login-btn").click(function () {
    // Log vào console
    let username = $("#username").val();
    let password = $("#password").val();

    // Kiểm tra nếu dữ liệu rỗng
    if (!username) {
      alert("Bạn chưa nhập username!");
    }
    if (!password) {
      alert("Bạn chưa nhập password!");
    }

    // Tiếp tục gửi yêu cầu nếu không có lỗi
    if (username && password) {
      const xhq = new XMLHttpRequest();
      xhq.open("POST", "/authentication/login", true);
      xhq.setRequestHeader("Content-Type", "application/json");
      xhq.onreadystatechange = function () {
        if (xhq.readyState === 4) {
          if (xhq.status === 200) {
            alert("Đăng nhập thành công!");
            window.location.href = "/admin/home"; // Chuyển hướng nếu đăng nhập thành công
          } else if (xhq.status === 500) {
            alert("Đăng nhập thất bại");
          } else if (xhq.status === 404) {
            alert("Username hoặc Password không chính xác!");
          } else {
            alert("Có lỗi xảy ra");
          }
        }
      };
      xhq.onerror = function () {
        alert("Không thể kết nối với máy chủ");
      };
      const data = JSON.stringify({ username: username, password: password });
      xhq.send(data);
    }
  });
});
var socket = io();

function face() {
  let username = $("#username").val();
  if (!username) {
    alert("Bạn chưa nhập username ");
  } else {
    socket.emit("Login-Face", username);
    socket.on("Result-Face", (res) => {
      if (res === true) {
        // Sửa thành so sánh boolean
        alert("Đăng nhập thành công!")
        window.location.href = "/admin/home";
      } else {
        alert("Không thể nhận diện được");

        window.location.reload();
      }
    });
  }
}
