# Video đường đến Mộc Nhi (Remotion)

Clip dọc 1080×1920, 30fps, khoảng 32 giây, phong cách TikTok cinematic: letterbox, film grain, light leak, chữ động, icon, infographic lộ trình, biểu đồ vòng điểm Google, bản đồ chuyển động.

## Cảnh

| # | Cảnh | File B-roll (tùy chọn) |
|---|------|------------------------|
| 1 | Hook "Lần đầu tới Mộc Nhi?" | `public/broll/hook.mp4` |
| 2 | Logo + 4,9★ | `public/broll/shop.mp4` (dùng chung với cảnh 8) |
| 3 | Infographic toàn lộ trình | không |
| 4 | Bước 1: dưới chân cầu Hậu Giang | `public/broll/step1.mp4` |
| 5 | Bước 2: tới cầu Phạm Văn Chí | `public/broll/step2.mp4` |
| 6 | Bước 3: lên cầu Lò Gốm | `public/broll/step3.mp4` |
| 7 | Bước 4: vào đường Lò Gốm | `public/broll/step4.mp4` |
| 8 | Tới nơi: bảng hiệu xanh | `public/broll/shop.mp4` |
| 9 | Chart: điểm Google, lượt đánh giá, giờ mở cửa | không |
| 10 | Kết: địa chỉ + kêu gọi lưu video | không |

Cảnh nào chưa có clip thì tự dùng bản đồ minh họa. Có clip (`.mp4`, `.mov`, `.webm`) hoặc ảnh (`.jpg`, `.png`) đúng tên thì clip thay vào, kèm bản đồ nhỏ góc phải cho các bước.

Âm thanh (tùy chọn): `public/music.mp3` (nhạc nền, tự giảm 35%) và `public/voice.mp3` (giọng đọc).

## Chạy

```bash
npm install
npm run studio      # xem và chỉnh trên trình duyệt
npm run render      # xuất out/duong-den-moc-nhi.mp4
```

Thông tin tiệm sửa ở `src/theme.ts`, câu chữ từng bước ở `STEPS` trong `src/Video.tsx`. Bản đồ là sơ đồ minh họa, không theo tỉ lệ.
