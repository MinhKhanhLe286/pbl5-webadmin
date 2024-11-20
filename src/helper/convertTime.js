function convertToUTC(localTime) {
  if (!localTime) return null; // kiểm tra null hoặc undefined
  const date = new Date(localTime + "Z"); // Thêm ký tự "Z" để chỉ rõ múi giờ UTC
  return new Date(date.getTime() - 7 * 60 * 60 * 1000); // Trừ đi 7 giờ để chuyển sang UTC
}

function vietnameseTimeConvert(isotime) {
  const date = new Date(isotime);
  
  // Lấy ngày, giờ và phút theo định dạng Việt Nam
  const vietnamTime = date.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh", // Đảm bảo múi giờ Việt Nam
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Định dạng 24 giờ
  });

  return `${vietnamTime} AM`;
}

module.exports = { convertToUTC, vietnameseTimeConvert };