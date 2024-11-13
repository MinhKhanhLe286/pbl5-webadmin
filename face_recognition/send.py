import cv2
import face_recognition
import pickle
import numpy as np
import socketio
import base64

# Khởi tạo Socket.IO client
sio = socketio.Client()

# Kết nối tới server
sio.connect('http://localhost:3333')

# Nạp known_face_encodings và known_face_names từ file
with open('face_data.pkl', 'rb') as f:
    known_face_encodings, known_face_names = pickle.load(f)

# Khởi tạo webcam
video_capture = cv2.VideoCapture(0)

while True:
    # Đọc khung hình từ webcam
    ret, frame = video_capture.read()
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Tìm và nhận diện khuôn mặt
    face_locations = face_recognition.face_locations(rgb_frame)
    face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

    for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
        matches = face_recognition.compare_faces(known_face_encodings, face_encoding, tolerance=0.45)
        name = "Unknown"

        if True in matches:
            first_match_index = matches.index(True)
            name = known_face_names[first_match_index]

        face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
        best_match_index = np.argmin(face_distances)

        if matches[best_match_index]:
            name = known_face_names[best_match_index]
            distance = round(face_distances[best_match_index], 2)

        # Vẽ hình chữ nhật và tên
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
        cv2.putText(frame, f"{name} ({distance})", (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (255, 255, 255), 2)

    # Mã hóa khung hình thành JPEG rồi chuyển sang Base64
    _, buffer = cv2.imencode('.jpg', frame)
    jpg_as_text = base64.b64encode(buffer).decode('utf-8')

    # Gửi ảnh tới server Node.js
    sio.emit('Python_send_server', jpg_as_text)

    # Hiển thị khung hình
    cv2.imshow('Video', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

video_capture.release()
cv2.destroyAllWindows()
sio.disconnect()
