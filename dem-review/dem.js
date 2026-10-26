// Đếm đánh giá Google Maps mới trong 7 ngày (chạy trên trang salon, tab "Bài đánh giá", sắp xếp "Mới nhất")
(async () => {
  const visible = el => el.getClientRects().length > 0 && el.offsetParent !== null;
  // Tự mở danh sách "Bài đánh giá" đầy đủ và chọn "Mới nhất" (khỏi phải bấm tay)
  const ngu = ms => new Promise(r => setTimeout(r, ms));
  const chu = e => (e.textContent || '').trim();
  const nut = re => [...document.querySelectorAll('button, [role="tab"]')].filter(visible).find(b => re.test(chu(b)) || re.test(b.getAttribute('aria-label') || ''));
  const tabDG = [...document.querySelectorAll('[role="tab"]')].filter(visible).find(b => /^(Bài đánh giá|Reviews)/i.test(chu(b)));
  if (tabDG && tabDG.getAttribute('aria-selected') !== 'true') { tabDG.click(); await ngu(2500); }
  else if (!tabDG) { const them = nut(/Bài đánh giá khác|More reviews/i); if (them) { them.click(); await ngu(2500); } }
  const nhanMoiNhat = () => [...document.querySelectorAll('button, div, span')].some(e => e.children.length === 0 && visible(e) && /^(Mới nhất|Newest)$/i.test(chu(e)));
  if (!nhanMoiNhat()) {
    const sx = nut(/^(Sắp xếp|Sort|Phù hợp nhất|Most relevant)/i);
    if (sx) {
      sx.click(); await ngu(1200);
      const opt = [...document.querySelectorAll('[role="menuitemradio"], [role="option"], [role="menuitem"]')].find(o => /Mới nhất|Newest/i.test(chu(o)));
      if (opt) { opt.click(); await ngu(3000); } else document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles: true}));
    }
  }
  const daSapXep = nhanMoiNhat();
  // Chỉ đọc trong khung của salon đang mở (bỏ qua danh sách kết quả tìm kiếm "30shine" còn sót bên cạnh)
  const firstR = [...document.querySelectorAll('div.jftiEf')].find(visible);
  const main = firstR?.closest('div[role="main"]') || document;
  const h1 = [...main.querySelectorAll('h1')].find(e => visible(e) && e.textContent.trim());
  const urlTen = decodeURIComponent(((location.pathname.match(/\/place\/([^/]+)/) || [])[1] || '').replace(/\+/g, ' '));
  let salon = ((main.getAttribute && main.getAttribute('aria-label')) || h1?.textContent || urlTen || document.title.replace(/\s*-\s*Google Maps.*$/i, '')).trim() || 'Không rõ tên';
  const docDiaChi = () => { const a = main.querySelector('button[data-item-id="address"]'); return (a?.getAttribute('aria-label') || a?.textContent || '').replace(/^Địa chỉ:\s*/i, '').trim(); };
  let dia_chi = docDiaChi();
  const placeId = (location.href.match(/!1s(0x[0-9a-f]+:0x[0-9a-f]+)/i) || [])[1] || salon;
  const getItems = () => [...main.querySelectorAll('div.jftiEf')].filter(visible);
  const first = getItems()[0];
  if (!first) { alert(`${salon}\nChưa thấy đánh giá. Bấm tab "Bài đánh giá", chọn Sắp xếp › Mới nhất rồi chạy lại.`); return; }
  let box = first.parentElement;
  while (box && !(/(auto|scroll)/.test(getComputedStyle(box).overflowY) && box.scrollHeight > box.clientHeight + 5)) box = box.parentElement;
  box = box || document.scrollingElement;
  // Đổi "5 ngày trước" / "một tuần trước" thành số ngày ("năm ngày" = 5 ngày, "năm trước" = 1 năm)
  const NUM = {'một': 1, 'hai': 2, 'ba': 3, 'bốn': 4, 'năm': 5, 'sáu': 6};
  const soNgay = t => { t = (t || '').toLowerCase(); if (/phút|giờ|giây/.test(t)) return 0; const m = t.match(/(\d+|một|hai|ba|bốn|năm|sáu)\s*ngày/); if (m) return +m[1] || NUM[m[1]]; return /tuần|tháng|năm trước/.test(t) ? 99 : NaN; };
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  // Kéo xuống từng đợt (Google tải 10 bài/lần), đợi bài mới hiện ra; dừng khi gặp bài quá hạn hoặc hết bài (5 lần liền không có bài mới)
  // Ẩn ảnh trong bài đánh giá cho kéo nhanh hơn, và hiện bảng tiến độ để biết lệnh đang chạy
  document.getElementById('dr-hide')?.remove(); document.getElementById('dr-badge')?.remove();
  const st = document.createElement('style'); st.id = 'dr-hide';
  st.textContent = 'div.jftiEf .KtCyie, div.jftiEf button.Tya61d, div.jftiEf button[data-photo-index] {display:none!important}';
  document.head.appendChild(st);
  const badge = document.createElement('div'); badge.id = 'dr-badge';
  badge.style.cssText = 'position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:2147483647;background:#0f766e;color:#fff;padding:10px 18px;border-radius:999px;font:600 15px system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.3)';
  badge.textContent = '⏳ Đang đếm…'; document.body.appendChild(badge);
  const xong = () => { badge.remove(); st.remove(); };
  let toiHan = false;
  for (let dung = 0; dung < 5; ) { // không giới hạn số lần kéo; chỉ dừng khi tới hạn hoặc Google hết bài
    const items = getItems();
    badge.textContent = `⏳ Đang đếm ${salon}… đã đọc ${items.length} bài · tới: ${items[items.length - 1]?.querySelector('.rsqaWe')?.textContent || '…'}`;
    if (items.length && (d => soNgay(d) > 6)(items[items.length - 1].querySelector('.rsqaWe')?.textContent || '')) { toiHan = true; break; }
    const truoc = items.length;
    items[items.length - 1]?.scrollIntoView({block: 'end'});
    box.scrollTop = box.scrollHeight;
    for (let w = 0; w < 20 && getItems().length === truoc; w++) await sleep(400);
    dung = getItems().length === truoc ? dung + 1 : 0;
  }
  xong();
  const seen = new Set();
  const rows = getItems().filter(e => { const id = e.getAttribute('data-review-id'); if (seen.has(id)) return false; seen.add(id); return true; })
    .map(e => ({
      ten: e.querySelector('.d4r55')?.textContent.trim(),
      sao: +((e.querySelector('.kvMYJc')?.getAttribute('aria-label') || '').match(/\d/)?.[0] || 0),
      thoi_gian: e.querySelector('.rsqaWe')?.textContent.trim(),
      noi_dung: (e.querySelector('.wiI7pd')?.textContent || '').trim().slice(0, 80),
    }));
  // Điểm tổng trên Google Maps (ô to "4,5" và "1.228 bài viết" ở đầu tab Bài đánh giá)
  const leaves = [...main.querySelectorAll('div, span')].filter(e => e.children.length === 0 && visible(e));
  const rEl = leaves.find(e => /^[1-5][,.]\d$/.test(e.textContent.trim()));
  const nEl = leaves.find(e => /^[\d.,]+\s*(bài viết|bài đánh giá|đánh giá|reviews?)$/i.test(e.textContent.trim()));
  const rating_map = rEl ? +rEl.textContent.trim().replace(',', '.') : null;
  const tong_review = nEl ? +nEl.textContent.replace(/[^\d]/g, '') : null;
  const moi = rows.filter(r => soNgay(r.thoi_gian) <= 6);
  const lastOk = rows.map(r => soNgay(r.thoi_gian) <= 6).lastIndexOf(true);
  const dungIdx = rows.findIndex((r, i) => i > lastOk && soNgay(r.thoi_gian) > 6);
  const dungO = dungIdx >= 0 ? `\nĐã đọc ${rows.length} bài, dừng ở bài thứ ${dungIdx + 1}: ${rows[dungIdx].ten} – "${rows[dungIdx].thoi_gian}"` : '';
  const tb = moi.length ? +(moi.reduce((a, r) => a + r.sao, 0) / moi.length).toFixed(2) : 0;
  console.log(`📍 ${salon}`); console.table(moi);
  // Chưa có địa chỉ: mở tab "Tổng quan" để đọc (đếm xong rồi nên không ảnh hưởng)
  if (!dia_chi) {
    [...main.querySelectorAll('button[role="tab"]')].find(b => /Tổng quan|Overview/i.test(b.textContent))?.click();
    for (let w = 0; w < 12 && !dia_chi; w++) { await sleep(400); dia_chi = docDiaChi(); }
  }
  let all = {}; try { all = JSON.parse(localStorage.getItem('dem_review') || '{}'); } catch {}
  for (const k of Object.keys(all)) if (k === salon && !all[k].ten) delete all[k]; // bỏ dòng cũ lưu theo tên
  all[placeId] = {ten: salon, dia_chi, rating_map, tong_review, bai_moi_7_ngay: moi.length, diem_tb: tb, duoi_5_sao: moi.filter(r => r.sao < 5).length, ngay_dem: new Date().toLocaleDateString('vi-VN')};
  try { localStorage.setItem('dem_review', JSON.stringify(all)); } catch {}
  console.log('📊 Tổng hợp các salon:'); console.table(Object.values(all));
  alert(`${salon}\n${dia_chi}\nĐiểm Google Maps: ${rating_map ?? '?'}★ (${tong_review ?? '?'} đánh giá)\nĐánh giá mới trong 7 ngày: ${moi.length} bài\nĐiểm TB 7 ngày: ${tb} sao${dungO}${daSapXep ? '' : '\n\n⚠️ Chưa chọn được "Mới nhất". Hãy bấm Sắp xếp › Mới nhất rồi chạy lại.'}${toiHan ? '' : '\n\n⚠️ Chưa kéo tới bài cũ hơn 7 ngày (đã đọc ${rows.length} bài). Số có thể bị THIẾU, hãy chạy lại.'}`);
})();
