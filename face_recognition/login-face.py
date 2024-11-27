import socketio
from s3_face_recog import check_is_name_in_video as checkUser

sio = socketio.Client()

@sio.event
def connect():
    print('Connected to the server')

@sio.event
def disconnect():
    print('Disconnected from the server')

# Nếu check_is_name_in_video là đồng bộ, không cần await, chỉ cần gọi hàm bình thường
@sio.on('Login-Face-Send-Python')
def handle_login_face_send_python(data):
    print(f"Nhận dữ liệu từ server: {data}")
    if isinstance(data, str):
        username = data.strip().lower()
        result = checkUser(username, 10)  # Kiểm tra tên người dùng trong video
        sio.emit("Login-Face-From-Python", result)  # Trả kết quả lại cho server
        print("Phát dữ liệu cho NodeJS.", result)
    else:
        print("Dữ liệu không hợp lệ, không phải chuỗi.")
        sio.emit("Login-Face-From-Python", False)

# Kết nối đến server
sio.connect('http://localhost:3333')
try:
    # Client sẽ không dừng lại, lắng nghe các sự kiện từ server
    sio.wait()
except KeyboardInterrupt:
    print("Client disconnected")
