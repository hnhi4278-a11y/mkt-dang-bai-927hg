# Đếm đánh giá Google Maps 7 ngày

Bộ 3 lệnh để đếm số đánh giá mới trong 7 ngày của từng salon trên Google Maps, lưu bảng so sánh giữa các salon.

| Lệnh | Làm gì |
|---|---|
| **⭐ Đếm review** | Đếm bài mới trong 7 ngày, ghi điểm Google Maps + tổng số đánh giá của salon đang mở, lưu vào bảng |
| **📊 Xem bảng** | Mở bảng báo cáo trên trang: tên + địa chỉ từng salon, rating TB, xếp hạng, nút copy sang Excel/Sheets |
| **🗑 Xóa bảng** | Xóa bảng để đếm tuần mới |
| **📖 Đọc 2 ngày** (`doc2.js`) | Hiện toàn bộ nội dung đánh giá 2 ngày gần nhất của salon đang mở, tô đỏ bài dưới 5★, có nút copy |

---

## Cách 1 (khuyên dùng): Nút bấm trên thanh dấu trang

Làm **một lần**, sau đó mỗi lần đếm chỉ cần **1 cú bấm**, không cần mở Console.

1. Hiện thanh dấu trang: **Cmd + Shift + B** (Mac) / **Ctrl + Shift + B** (Windows).
2. Chuột phải vào thanh dấu trang › **Thêm trang…**
3. **Tên:** `⭐ Đếm review` · **URL:** dán toàn bộ dòng trong ô **Đếm review** bên dưới › **Lưu**.
4. Lặp lại cho **📊 Xem bảng** và **🗑 Xóa bảng**.

### Đếm review
```
javascript:(async%20()%20%3D%3E%20%7B%0A%20%20const%20visible%20%3D%20el%20%3D%3E%20el.getClientRects().length%20%3E%200%20%26%26%20el.offsetParent%20!%3D%3D%20null%3B%0A%20%20const%20h1%20%3D%20%5B...document.querySelectorAll('h1')%5D.find(e%20%3D%3E%20visible(e)%20%26%26%20e.textContent.trim())%3B%0A%20%20const%20salon%20%3D%20(h1%3F.textContent%20%7C%7C%20document.title.replace(%2F%5Cs*-%5Cs*Google%20Maps.*%24%2Fi%2C%20'')).trim()%20%7C%7C%20'Kh%C3%B4ng%20r%C3%B5%20t%C3%AAn'%3B%0A%20%20const%20addrEl%20%3D%20document.querySelector('button%5Bdata-item-id%3D%22address%22%5D')%3B%0A%20%20const%20dia_chi%20%3D%20(addrEl%3F.getAttribute('aria-label')%20%7C%7C%20addrEl%3F.textContent%20%7C%7C%20'').replace(%2F%5E%C4%90%E1%BB%8Ba%20ch%E1%BB%89%3A%5Cs*%2Fi%2C%20'').trim()%3B%0A%20%20const%20placeId%20%3D%20(location.href.match(%2F!1s(0x%5B0-9a-f%5D%2B%3A0x%5B0-9a-f%5D%2B)%2Fi)%20%7C%7C%20%5B%5D)%5B1%5D%20%7C%7C%20dia_chi%20%7C%7C%20salon%3B%0A%20%20const%20getItems%20%3D%20()%20%3D%3E%20%5B...document.querySelectorAll('div.jftiEf')%5D.filter(visible)%3B%0A%20%20const%20first%20%3D%20getItems()%5B0%5D%3B%0A%20%20if%20(!first)%20%7B%20alert(%60%24%7Bsalon%7D%5CnCh%C6%B0a%20th%E1%BA%A5y%20%C4%91%C3%A1nh%20gi%C3%A1.%20B%E1%BA%A5m%20tab%20%22B%C3%A0i%20%C4%91%C3%A1nh%20gi%C3%A1%22%2C%20ch%E1%BB%8Dn%20S%E1%BA%AFp%20x%E1%BA%BFp%20%E2%80%BA%20M%E1%BB%9Bi%20nh%E1%BA%A5t%20r%E1%BB%93i%20ch%E1%BA%A1y%20l%E1%BA%A1i.%60)%3B%20return%3B%20%7D%0A%20%20let%20box%20%3D%20first.parentElement%3B%0A%20%20while%20(box%20%26%26%20box.scrollHeight%20%3C%3D%20box.clientHeight%20%2B%205)%20box%20%3D%20box.parentElement%3B%0A%20%20const%20sleep%20%3D%20ms%20%3D%3E%20new%20Promise(r%20%3D%3E%20setTimeout(r%2C%20ms))%3B%0A%20%20for%20(let%20i%20%3D%200%3B%20i%20%3C%2060%3B%20i%2B%2B)%20%7B%0A%20%20%20%20const%20dates%20%3D%20getItems().map(e%20%3D%3E%20e.querySelector('.rsqaWe')%3F.textContent%20%7C%7C%20'')%3B%0A%20%20%20%20if%20(dates.some(d%20%3D%3E%20%2Ftu%E1%BA%A7n%7Cth%C3%A1ng%7Cn%C4%83m%2F.test(d)))%20break%3B%0A%20%20%20%20box.scrollBy(0%2C%203000)%3B%0A%20%20%20%20await%20sleep(1200)%3B%0A%20%20%7D%0A%20%20const%20seen%20%3D%20new%20Set()%3B%0A%20%20const%20rows%20%3D%20getItems().filter(e%20%3D%3E%20%7B%20const%20id%20%3D%20e.getAttribute('data-review-id')%3B%20if%20(seen.has(id))%20return%20false%3B%20seen.add(id)%3B%20return%20true%3B%20%7D)%0A%20%20%20%20.map(e%20%3D%3E%20(%7B%0A%20%20%20%20%20%20ten%3A%20e.querySelector('.d4r55')%3F.textContent.trim()%2C%0A%20%20%20%20%20%20sao%3A%20%2B((e.querySelector('.kvMYJc')%3F.getAttribute('aria-label')%20%7C%7C%20'').match(%2F%5Cd%2F)%3F.%5B0%5D%20%7C%7C%200)%2C%0A%20%20%20%20%20%20thoi_gian%3A%20e.querySelector('.rsqaWe')%3F.textContent.trim()%2C%0A%20%20%20%20%20%20noi_dung%3A%20(e.querySelector('.wiI7pd')%3F.textContent%20%7C%7C%20'').trim().slice(0%2C%2080)%2C%0A%20%20%20%20%7D))%3B%0A%20%20const%20leaves%20%3D%20%5B...document.querySelectorAll('div%2C%20span')%5D.filter(e%20%3D%3E%20e.children.length%20%3D%3D%3D%200%20%26%26%20visible(e))%3B%0A%20%20const%20rEl%20%3D%20leaves.find(e%20%3D%3E%20%2F%5E%5B1-5%5D%5B%2C.%5D%5Cd%24%2F.test(e.textContent.trim()))%3B%0A%20%20const%20nEl%20%3D%20leaves.find(e%20%3D%3E%20%2F%5E%5B%5Cd.%2C%5D%2B%5Cs*(b%C3%A0i%20vi%E1%BA%BFt%7Cb%C3%A0i%20%C4%91%C3%A1nh%20gi%C3%A1%7C%C4%91%C3%A1nh%20gi%C3%A1%7Creviews%3F)%24%2Fi.test(e.textContent.trim()))%3B%0A%20%20const%20rating_map%20%3D%20rEl%20%3F%20%2BrEl.textContent.trim().replace('%2C'%2C%20'.')%20%3A%20null%3B%0A%20%20const%20tong_review%20%3D%20nEl%20%3F%20%2BnEl.textContent.replace(%2F%5B%5E%5Cd%5D%2Fg%2C%20'')%20%3A%20null%3B%0A%20%20const%20moi%20%3D%20rows.filter(r%20%3D%3E%20%2Fph%C3%BAt%7Cgi%E1%BB%9D%7Cng%C3%A0y%2F.test(r.thoi_gian%20%7C%7C%20''))%3B%0A%20%20const%20tb%20%3D%20moi.length%20%3F%20%2B(moi.reduce((a%2C%20r)%20%3D%3E%20a%20%2B%20r.sao%2C%200)%20%2F%20moi.length).toFixed(2)%20%3A%200%3B%0A%20%20console.log(%60%F0%9F%93%8D%20%24%7Bsalon%7D%60)%3B%20console.table(moi)%3B%0A%20%20let%20all%20%3D%20%7B%7D%3B%20try%20%7B%20all%20%3D%20JSON.parse(localStorage.getItem('dem_review')%20%7C%7C%20'%7B%7D')%3B%20%7D%20catch%20%7B%7D%0A%20%20for%20(const%20k%20of%20Object.keys(all))%20if%20(k%20%3D%3D%3D%20salon%20%26%26%20!all%5Bk%5D.ten)%20delete%20all%5Bk%5D%3B%20%2F%2F%20b%E1%BB%8F%20d%C3%B2ng%20c%C5%A9%20l%C6%B0u%20theo%20t%C3%AAn%0A%20%20all%5BplaceId%5D%20%3D%20%7Bten%3A%20salon%2C%20dia_chi%2C%20rating_map%2C%20tong_review%2C%20bai_moi_7_ngay%3A%20moi.length%2C%20diem_tb%3A%20tb%2C%20duoi_5_sao%3A%20moi.filter(r%20%3D%3E%20r.sao%20%3C%205).length%2C%20ngay_dem%3A%20new%20Date().toLocaleDateString('vi-VN')%7D%3B%0A%20%20try%20%7B%20localStorage.setItem('dem_review'%2C%20JSON.stringify(all))%3B%20%7D%20catch%20%7B%7D%0A%20%20console.log('%F0%9F%93%8A%20T%E1%BB%95ng%20h%E1%BB%A3p%20c%C3%A1c%20salon%3A')%3B%20console.table(Object.values(all))%3B%0A%20%20alert(%60%24%7Bsalon%7D%5Cn%24%7Bdia_chi%7D%5Cn%C4%90i%E1%BB%83m%20Google%20Maps%3A%20%24%7Brating_map%20%3F%3F%20'%3F'%7D%E2%98%85%20(%24%7Btong_review%20%3F%3F%20'%3F'%7D%20%C4%91%C3%A1nh%20gi%C3%A1)%5Cn%C4%90%C3%A1nh%20gi%C3%A1%20m%E1%BB%9Bi%20trong%207%20ng%C3%A0y%3A%20%24%7Bmoi.length%7D%20b%C3%A0i%5Cn%C4%90i%E1%BB%83m%20TB%207%20ng%C3%A0y%3A%20%24%7Btb%7D%20sao%60)%3B%0A%7D)()%3B%0A
```

### Xem bảng
```
javascript:(()%20%3D%3E%20%7B%0A%20%20let%20all%20%3D%20%7B%7D%3B%20try%20%7B%20all%20%3D%20JSON.parse(localStorage.getItem('dem_review')%20%7C%7C%20'%7B%7D')%3B%20%7D%20catch%20%7B%7D%0A%20%20const%20list%20%3D%20Object.entries(all).map((%5Bk%2C%20v%5D)%20%3D%3E%20(%7Bten%3A%20v.ten%20%7C%7C%20k%2C%20dia_chi%3A%20v.dia_chi%20%7C%7C%20''%2C%20...v%7D))%3B%0A%20%20if%20(!list.length)%20%7B%20alert('Ch%C6%B0a%20c%C3%B3%20salon%20n%C3%A0o%20%C4%91%C6%B0%E1%BB%A3c%20%C4%91%E1%BA%BFm.')%3B%20return%3B%20%7D%0A%20%20list.sort((a%2C%20b)%20%3D%3E%20(b.rating_map%20%7C%7C%200)%20-%20(a.rating_map%20%7C%7C%200))%3B%0A%20%20const%20rated%20%3D%20list.filter(x%20%3D%3E%20x.rating_map)%3B%0A%20%20const%20tbThuong%20%3D%20rated.length%20%3F%20(rated.reduce((a%2C%20x)%20%3D%3E%20a%20%2B%20x.rating_map%2C%200)%20%2F%20rated.length).toFixed(2)%20%3A%20'%3F'%3B%0A%20%20const%20w%20%3D%20rated.filter(x%20%3D%3E%20x.tong_review)%3B%0A%20%20const%20tongRv%20%3D%20w.reduce((a%2C%20x)%20%3D%3E%20a%20%2B%20x.tong_review%2C%200)%3B%0A%20%20const%20tbTrongSo%20%3D%20tongRv%20%3F%20(w.reduce((a%2C%20x)%20%3D%3E%20a%20%2B%20x.rating_map%20*%20x.tong_review%2C%200)%20%2F%20tongRv).toFixed(2)%20%3A%20'%3F'%3B%0A%20%20const%20moi%20%3D%20list.reduce((a%2C%20x)%20%3D%3E%20a%20%2B%20(x.bai_moi_7_ngay%20%7C%7C%200)%2C%200)%3B%0A%20%20const%20esc%20%3D%20t%20%3D%3E%20String(t%20%3F%3F%20'').replace(%2F%5B%26%3C%3E%5D%2Fg%2C%20c%20%3D%3E%20(%7B'%26'%3A%20'%26amp%3B'%2C%20'%3C'%3A%20'%26lt%3B'%2C%20'%3E'%3A%20'%26gt%3B'%7D%5Bc%5D))%3B%0A%20%20document.getElementById('dem-review-report')%3F.remove()%3B%0A%20%20const%20box%20%3D%20document.createElement('div')%3B%0A%20%20box.id%20%3D%20'dem-review-report'%3B%0A%20%20box.style.cssText%20%3D%20'position%3Afixed%3Binset%3A24px%3Bz-index%3A2147483647%3Bbackground%3A%23fff%3Bcolor%3A%2314211f%3Bborder-radius%3A16px%3Bbox-shadow%3A0%2020px%2060px%20rgba(0%2C0%2C0%2C.35)%3Bfont%3A14px%2F1.45%20system-ui%2Csans-serif%3Bdisplay%3Aflex%3Bflex-direction%3Acolumn%3Boverflow%3Ahidden'%3B%0A%20%20const%20td%20%3D%20'padding%3A8px%2010px%3Bborder-bottom%3A1px%20solid%20%23e3ebe8%3Btext-align%3Aleft%3Bvertical-align%3Atop'%3B%0A%20%20box.innerHTML%20%3D%20%60%0A%20%20%20%20%3Cdiv%20style%3D%22padding%3A16px%2020px%3Bborder-bottom%3A1px%20solid%20%23e3ebe8%3Bdisplay%3Aflex%3Bgap%3A12px%3Balign-items%3Acenter%3Bflex-wrap%3Awrap%22%3E%0A%20%20%20%20%20%20%3Cb%20style%3D%22font-size%3A18px%3Bflex%3A1%22%3E%F0%9F%93%8A%20B%C3%A1o%20c%C3%A1o%20%24%7Blist.length%7D%20salon%3C%2Fb%3E%0A%20%20%20%20%20%20%3Cbutton%20id%3D%22drr-copy%22%20style%3D%22padding%3A8px%2014px%3Bborder-radius%3A10px%3Bborder%3A0%3Bbackground%3A%230f766e%3Bcolor%3A%23fff%3Bfont-weight%3A600%3Bcursor%3Apointer%22%3ECopy%20b%E1%BA%A3ng%20(d%C3%A1n%20v%C3%A0o%20Excel%2FSheets)%3C%2Fbutton%3E%0A%20%20%20%20%20%20%3Cbutton%20id%3D%22drr-close%22%20style%3D%22padding%3A8px%2014px%3Bborder-radius%3A10px%3Bborder%3A1px%20solid%20%23cfd9d5%3Bbackground%3A%23fff%3Bcursor%3Apointer%22%3E%C4%90%C3%B3ng%3C%2Fbutton%3E%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%3Cdiv%20style%3D%22padding%3A12px%2020px%3Bdisplay%3Aflex%3Bgap%3A24px%3Bflex-wrap%3Awrap%3Bbackground%3A%23f2f7f5%22%3E%0A%20%20%20%20%20%20%3Cdiv%3E%E2%AD%90%20Rating%20TB%20c%C3%A1c%20salon%3A%20%3Cb%3E%24%7BtbThuong%7D%3C%2Fb%3E%3C%2Fdiv%3E%0A%20%20%20%20%20%20%3Cdiv%3E%E2%AD%90%20Rating%20TB%20theo%20s%E1%BB%91%20%C4%91%C3%A1nh%20gi%C3%A1%3A%20%3Cb%3E%24%7BtbTrongSo%7D%3C%2Fb%3E%3C%2Fdiv%3E%0A%20%20%20%20%20%20%3Cdiv%3ET%E1%BB%95ng%20%C4%91%C3%A1nh%20gi%C3%A1%20tr%C3%AAn%20Maps%3A%20%3Cb%3E%24%7BtongRv.toLocaleString('vi-VN')%7D%3C%2Fb%3E%3C%2Fdiv%3E%0A%20%20%20%20%20%20%3Cdiv%3EB%C3%A0i%20m%E1%BB%9Bi%207%20ng%C3%A0y%3A%20%3Cb%3E%24%7Bmoi%7D%3C%2Fb%3E%3C%2Fdiv%3E%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%3Cdiv%20style%3D%22overflow%3Aauto%3Bflex%3A1%22%3E%0A%20%20%20%20%20%20%3Ctable%20style%3D%22border-collapse%3Acollapse%3Bwidth%3A100%25%22%3E%0A%20%20%20%20%20%20%20%20%3Cthead%20style%3D%22position%3Asticky%3Btop%3A0%3Bbackground%3A%23fff%22%3E%3Ctr%3E%0A%20%20%20%20%20%20%20%20%20%20%24%7B%5B'%23'%2C%20'Salon'%2C%20'%C4%90%E1%BB%8Ba%20ch%E1%BB%89'%2C%20'Rating%20Maps'%2C%20'T%E1%BB%95ng%20%C4%90G'%2C%20'M%E1%BB%9Bi%207%20ng%C3%A0y'%2C%20'TB%207%20ng%C3%A0y'%2C%20'D%C6%B0%E1%BB%9Bi%205%E2%98%85'%2C%20'Ng%C3%A0y%20%C4%91%E1%BA%BFm'%5D.map(h%20%3D%3E%20%60%3Cth%20style%3D%22%24%7Btd%7D%3Bfont-weight%3A700%22%3E%24%7Bh%7D%3C%2Fth%3E%60).join('')%7D%0A%20%20%20%20%20%20%20%20%3C%2Ftr%3E%3C%2Fthead%3E%0A%20%20%20%20%20%20%20%20%3Ctbody%3E%24%7Blist.map((x%2C%20i)%20%3D%3E%20%60%3Ctr%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ctd%20style%3D%22%24%7Btd%7D%22%3E%24%7Bi%20%2B%201%7D%3C%2Ftd%3E%3Ctd%20style%3D%22%24%7Btd%7D%22%3E%3Cb%3E%24%7Besc(x.ten)%7D%3C%2Fb%3E%3C%2Ftd%3E%3Ctd%20style%3D%22%24%7Btd%7D%3Bcolor%3A%235b6b67%22%3E%24%7Besc(x.dia_chi)%20%7C%7C%20'%E2%80%94'%7D%3C%2Ftd%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ctd%20style%3D%22%24%7Btd%7D%22%3E%24%7Bx.rating_map%20%3F%3F%20'%3F'%7D%E2%98%85%3C%2Ftd%3E%3Ctd%20style%3D%22%24%7Btd%7D%22%3E%24%7Bx.tong_review%20%3F%3F%20'%3F'%7D%3C%2Ftd%3E%3Ctd%20style%3D%22%24%7Btd%7D%22%3E%24%7Bx.bai_moi_7_ngay%20%3F%3F%200%7D%3C%2Ftd%3E%0A%20%20%20%20%20%20%20%20%20%20%3Ctd%20style%3D%22%24%7Btd%7D%22%3E%24%7Bx.diem_tb%20%3F%3F%20''%7D%3C%2Ftd%3E%3Ctd%20style%3D%22%24%7Btd%7D%3B%24%7Bx.duoi_5_sao%20%3F%20'color%3A%23b91c1c%3Bfont-weight%3A700'%20%3A%20''%7D%22%3E%24%7Bx.duoi_5_sao%20%3F%3F%200%7D%3C%2Ftd%3E%3Ctd%20style%3D%22%24%7Btd%7D%22%3E%24%7Besc(x.ngay_dem)%7D%3C%2Ftd%3E%0A%20%20%20%20%20%20%20%20%3C%2Ftr%3E%60).join('')%7D%3C%2Ftbody%3E%0A%20%20%20%20%20%20%3C%2Ftable%3E%0A%20%20%20%20%3C%2Fdiv%3E%60%3B%0A%20%20document.body.appendChild(box)%3B%0A%20%20box.querySelector('%23drr-close').onclick%20%3D%20()%20%3D%3E%20box.remove()%3B%0A%20%20box.querySelector('%23drr-copy').onclick%20%3D%20e%20%3D%3E%20%7B%0A%20%20%20%20const%20rows%20%3D%20%5B%5B'Salon'%2C%20'%C4%90%E1%BB%8Ba%20ch%E1%BB%89'%2C%20'Rating%20Maps'%2C%20'T%E1%BB%95ng%20%C4%90G'%2C%20'M%E1%BB%9Bi%207%20ng%C3%A0y'%2C%20'TB%207%20ng%C3%A0y'%2C%20'D%C6%B0%E1%BB%9Bi%205%20sao'%2C%20'Ng%C3%A0y%20%C4%91%E1%BA%BFm'%5D%2C%0A%20%20%20%20%20%20...list.map(x%20%3D%3E%20%5Bx.ten%2C%20x.dia_chi%2C%20x.rating_map%20%3F%3F%20''%2C%20x.tong_review%20%3F%3F%20''%2C%20x.bai_moi_7_ngay%20%3F%3F%200%2C%20x.diem_tb%20%3F%3F%20''%2C%20x.duoi_5_sao%20%3F%3F%200%2C%20x.ngay_dem%5D)%2C%0A%20%20%20%20%20%20%5B%5D%2C%20%5B'Rating%20TB%20c%C3%A1c%20salon'%2C%20tbThuong%5D%2C%20%5B'Rating%20TB%20theo%20s%E1%BB%91%20%C4%91%C3%A1nh%20gi%C3%A1'%2C%20tbTrongSo%5D%2C%20%5B'T%E1%BB%95ng%20%C4%91%C3%A1nh%20gi%C3%A1'%2C%20tongRv%5D%2C%20%5B'B%C3%A0i%20m%E1%BB%9Bi%207%20ng%C3%A0y'%2C%20moi%5D%5D%3B%0A%20%20%20%20const%20tsv%20%3D%20rows.map(r%20%3D%3E%20r.map(c%20%3D%3E%20String(c).replace(%2F%5Ct%7C%5Cn%2Fg%2C%20'%20')).join('%5Ct')).join('%5Cn')%3B%0A%20%20%20%20navigator.clipboard.writeText(tsv).then(()%20%3D%3E%20%7B%20e.target.textContent%20%3D%20'%E2%9C%85%20%C4%90%C3%A3%20copy%2C%20d%C3%A1n%20v%C3%A0o%20Excel%2FSheets'%3B%20%7D%2C%20()%20%3D%3E%20%7B%20e.target.textContent%20%3D%20'Kh%C3%B4ng%20copy%20%C4%91%C6%B0%E1%BB%A3c'%3B%20%7D)%3B%0A%20%20%7D%3B%0A%20%20console.table(list)%3B%0A%7D)()%3B%0A
```

### Xóa bảng
```
javascript:(()%20%3D%3E%20%7B%20try%20%7B%20localStorage.removeItem('dem_review')%3B%20%7D%20catch%20%7B%7D%20alert('%C4%90%C3%A3%20x%C3%B3a%20b%E1%BA%A3ng%20t%E1%BB%95ng%20h%E1%BB%A3p.%20S%E1%BA%B5n%20s%C3%A0ng%20%C4%91%E1%BA%BFm%20tu%E1%BA%A7n%20m%E1%BB%9Bi.')%3B%20%7D)()%3B%0A
```

---

## Cách 2: Lưu trong DevTools (Snippets)

1. Mở DevTools: **Cmd + Option + I** (Mac) / **Ctrl + Shift + I** (Windows).
2. Tab **Nguồn (Sources)** › mục **Đoạn mã (Snippets)** (bấm `»` nếu không thấy) › **+ Đoạn mã mới**.
3. Đặt tên `dem`, dán nội dung file `dem.js` › **Cmd + S** để lưu. Làm tương tự với `xem.js`, `xoa.js`.
4. Chạy: trong DevTools nhấn **Cmd + P** (Ctrl + P), gõ **`!dem`** › Enter.

---

## Quy trình mỗi tuần

1. Đầu tuần: bấm **🗑 Xóa bảng**.
2. Với từng salon:
   - Mở salon trên Google Maps (**mỗi salon một tab mới**, hoặc **Cmd + R** tải lại trang sau khi tìm salon mới).
   - Tab **Bài đánh giá** › **Sắp xếp** › **Mới nhất**.
   - Bấm **⭐ Đếm review**, đợi vài giây tới khi hiện thông báo.
3. Đếm xong: bấm **📊 Xem bảng**, chụp màn hình gửi báo cáo.

## Phím tắt hay dùng

| Việc | Mac | Windows |
|---|---|---|
| Hiện/ẩn thanh dấu trang | Cmd + Shift + B | Ctrl + Shift + B |
| Mở Console | Cmd + Option + J | Ctrl + Shift + J |
| Mở DevTools | Cmd + Option + I | Ctrl + Shift + I |
| Tắt/bật chế độ điện thoại trong DevTools | Cmd + Shift + M | Ctrl + Shift + M |
| Tải lại trang | Cmd + R | Ctrl + R / F5 |
| Mở tab mới | Cmd + T | Ctrl + T |
| Gọi lại lệnh vừa chạy trong Console | phím ↑ | phím ↑ |
| Chạy Snippet đã lưu | Cmd + P › gõ `!dem` | Ctrl + P › gõ `!dem` |

## Đọc báo cáo rating

- **Rating TB các salon**: cộng điểm Maps của từng salon rồi chia cho số salon (salon nào cũng tính như nhau).
- **Rating TB theo số đánh giá**: salon nhiều đánh giá được tính nặng hơn. Đây là số gần với "khách nói chung đánh giá chuỗi bao nhiêu sao".
- Salon được xếp từ điểm Maps cao xuống thấp.

## Lưu ý

- Chạy trên **máy tính**, giao diện **máy tính** (tắt chế độ điện thoại).
- "1 tuần trước" = 7–13 ngày nên **không** được tính.
- Bảng chỉ lưu trên **đúng máy + đúng trình duyệt Chrome** đã đếm.
- Nếu Google đổi giao diện làm lệnh đếm ra 0 bài, chụp Console gửi để sửa lệnh.
