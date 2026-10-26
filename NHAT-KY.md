# Nhật ký làm việc (mới nhất ở trên)

## 26/10/2026 — Sửa lệnh đếm bị thiếu (927 Hậu Giang báo 10 bài)
- Nghi nguyên nhân: Google tải 10 bài/lần, lệnh kéo sai khung nên chỉ đọc được đợt đầu (10 bài).
- Sửa cả 4 lệnh (dem, dem2, doc2, doc7): tìm đúng khung cuộn (overflow auto/scroll), kéo tới bài cuối, đợi bài mới tải xong mới kéo tiếp, dừng khi gặp bài quá hạn hoặc 4 lần không có bài mới.
- Thêm cảnh báo ⚠️ khi chưa kéo tới bài quá hạn ("số có thể bị THIẾU").
- Thử trên trang giả lập tải 10 bài/lần: 25 bài 7 ngày → đếm đúng 25.
- Còn chờ: người dùng chạy lại trên Maps thật để xác nhận.

## 24/10/2026 — Đếm review Google Maps
**Trạng thái:** Người dùng đã dùng được. Trang lệnh: https://claude.ai/artifact/5N6HqYqo9irgqeRDd1oDdK (tải lại trang để lấy lệnh mới).

**Các nút trên trang:**
- 7 ngày (xanh lá): Đếm 7 ngày (dừng ở "một tuần trước", không tính bài đó) · Báo cáo 7 ngày · Xóa bảng 7 ngày
- 2 ngày (tím): Đếm 2 ngày (tính phút/giờ/1/2 ngày, dừng ở "3 ngày trước") · Báo cáo 2 ngày · Xóa bảng 2 ngày
- Đọc nội dung: Đọc 7 ngày, Đọc 2 ngày (hiện chữ khách viết, tô đỏ bài dưới 5★)

**Cách dùng:** mở salon ở tab mới → Bài đánh giá › Mới nhất → Cmd+Option+J → Cmd+V → Enter. Salon tiếp: ↑ + Enter.

**Đã sửa gần đây:**
- Salon trùng tên "30Shine" (Tỉnh Lộ 10, 145 Tô Hiến Thành): lưu theo mã địa điểm + địa chỉ.
- Báo cáo hiện bảng lớn trên trang (có địa chỉ, rating TB các salon, rating TB theo số đánh giá, nút copy sang Excel).
- Google ghi thời gian bằng chữ ("một tuần trước", "năm ngày trước") → đã xử lý; trước đó lệnh 7 ngày dừng sớm ở "năm ngày".

**Lưu ý với người dùng:** Không dùng được trên điện thoại. Tắt chế độ điện thoại trong DevTools (Cmd+Shift+M). Mỗi salon mở tab mới để không lẫn dữ liệu salon cũ.

**Ý tưởng còn mở:** nút đếm tính luôn bài "một tuần trước" (người dùng chưa yêu cầu); so sánh tuần này với tuần trước; viết câu trả lời mẫu cho bài dưới 5★.

## 05–11/10/2026 — Mộc Nhi (1065 Lò Gốm, Q6)
- Nhận xét trang Google Maps tiệm, trang chỉ đường có giọng đọc (artifact EcYodCuAUdet5yUS61cK3R).
- Video Remotion `video-moc-nhi/` (33s, chưa có B-roll thật vì Google Drive bị chặn). Lộ trình: dưới cầu Hậu Giang → cầu Phạm Văn Chí → cầu Lò Gốm → đường Lò Gốm.
