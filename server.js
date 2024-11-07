const express = require('express');
const app = express();
const port = 3333;

// Định nghĩa route cho trang chủ
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Khởi động máy chủ
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
