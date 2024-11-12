// $(document).ready(() => {
//     alert("Link thành công");
//     $("#registerBtn").text("Đăng ký");

//     $("#registerBtn").click((event) => {
//         event.preventDefault();

//         let email = $('#email').val();
//         let username = $("#username").val();
//         let password = $("#password").val();
//         let confirm = $("#confirm-password").val();

//         if (password !== confirm) {
//             alert("Xác nhận mật khẩu không hợp lệ!");
//             return;
//         }

//         const xhr = new XMLHttpRequest();
//         xhr.open('POST', '/register', true);
//         xhr.setRequestHeader('Content-Type', 'application/json');

//         xhr.onload = function() {
//             if (xhr.status === 200) {
//                 alert('Đăng ký thành công!');
//                 window.location.href = '/admin/';
//             } else if (xhr.status === 500) {
//                 alert('Đăng ký thất bại');
//             }
//         };

//         const data = JSON.stringify({ email: email, username: username, password: password });
//         xhr.send(data);
//     });
// });

$(document).ready(function(){
    $("#registerBtn").click(()=>{
      
        let email = $('#email').val();
        let username = $("#username").val();
        let password = $("#password").val();
        let confirm = $("#confirm-password").val();

        if (password !== confirm) {
            alert("Xác nhận mật khẩu không hợp lệ!");
            return;
        }
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/authentication/register', true);

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function() {
            if (xhr.status === 200) {
                alert('Đăng ký thành công!');
                window.location.href = '/authentication/login';
            } else if (xhr.status === 500) {
                alert('Đăng ký thất bại');
            }
        };
        xhr.onerror = ()=>{
            alert("k kết nối máy chủ");
        }
        const data = JSON.stringify({ email: email, username: username, password: password });
        xhr.send(data);
    })
})