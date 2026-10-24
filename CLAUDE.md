# mkt-dang-bai

Trao đổi với người dùng bằng tiếng Việt, ngắn gọn, dễ hiểu (người dùng không rành kỹ thuật).

**Đầu mỗi phiên: đọc `NHAT-KY.md`** (tóm tắt việc gần nhất), không cần hỏi lại người dùng.
**Khi người dùng nhắn "ok"/xác nhận xong một việc:** thêm mục tóm tắt mới lên đầu `NHAT-KY.md` (ngày, việc đã làm, trạng thái, việc còn mở), commit và push.

## dem-review/ — lệnh đếm/đọc đánh giá Google Maps (chạy trong Console Chrome máy tính)
- Trang copy lệnh (artifact): https://claude.ai/artifact/5N6HqYqo9irgqeRDd1oDdK — nguồn là `dem-review/page.html`.
- Lệnh: `dem.js` đếm 7 ngày (localStorage `dem_review`), `xem.js` báo cáo, `xoa.js` xóa; `dem2/xem2/xoa2.js` bản 2 ngày (`dem_review_2ngay`); `doc7.js`, `doc2.js` đọc nội dung.
- Sửa lệnh xong: `python3 dem-review/build-page.py` rồi publish `dem-review/page.html` vào đúng URL artifact trên (truyền `url`).
- Selector Maps: review `div.jftiEf`, tên `.d4r55`, sao `.kvMYJc[aria-label]`, thời gian `.rsqaWe`, nội dung `.wiI7pd`, nút Thêm `button.w8nwRe`, địa chỉ `button[data-item-id="address"]`.
- Thời gian Google ghi cả số và chữ ("một tuần trước", "năm ngày trước"); dùng hàm `soNgay`. "năm trước" = 1 năm.
- Môi trường cloud bị Google chặn (403/CAPTCHA): không tự mở Maps được, thử bằng trang giả lập.

## video-moc-nhi/ — video Remotion chỉ đường tới Tiệm Gội Đầu Mộc Nhi (1065 Lò Gốm, Q6)
- Render: `./render-chunks.sh` (render từng đoạn, có retry). B-roll thả vào `public/broll/`.
