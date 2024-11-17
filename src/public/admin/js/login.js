$(document).ready(function() {
    $("#login-btn").click(function() {
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
        if(username && password){
            const xhq = new XMLHttpRequest();
            xhq.open("POST", "/authentication/login", true);
            xhq.setRequestHeader('Content-Type', 'application/json');
            xhq.onreadystatechange = function() {
                if (xhq.readyState === 4) {
                    if (xhq.status === 200) {
                        alert('Đăng nhập thành công!');
                        window.location.href = '/admin/home';  // Chuyển hướng nếu đăng nhập thành công
                    } else if (xhq.status === 500) {
                        alert('Đăng nhập thất bại');
                    } else if (xhq.status === 404) {
                        alert('Username hoặc Password không chính xác!');
                    } else {
                        alert("Có lỗi xảy ra");
                    }
                }
            };
            xhq.onerror = function() {
                alert("Không thể kết nối với máy chủ");
            };
            const data = JSON.stringify({ username: username, password: password });
            xhq.send(data);
            }
    });
});
