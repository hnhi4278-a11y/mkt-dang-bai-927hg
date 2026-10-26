// Đọc toàn bộ đánh giá 7 ngày gần nhất của salon đang mở, dừng khi gặp "một tuần trước"
(async () => {
  const SO_NGAY = 6; // tới "6 ngày trước", gặp "một tuần trước" thì dừng
  const visible = el => el.getClientRects().length > 0 && el.offsetParent !== null;
  // Chỉ đọc trong khung của salon đang mở (bỏ qua danh sách kết quả tìm kiếm "30shine" còn sót bên cạnh)
  const firstR = [...document.querySelectorAll('div.jftiEf')].find(visible);
  const main = firstR?.closest('div[role="main"]') || document;
  const h1 = [...main.querySelectorAll('h1')].find(e => visible(e) && e.textContent.trim());
  const urlTen = decodeURIComponent(((location.pathname.match(/\/place\/([^/]+)/) || [])[1] || '').replace(/\+/g, ' '));
  let salon = ((main.getAttribute && main.getAttribute('aria-label')) || h1?.textContent || urlTen || document.title.replace(/\s*-\s*Google Maps.*$/i, '')).trim() || 'Không rõ tên';
  const docDiaChi = () => { const a = main.querySelector('button[data-item-id="address"]'); return (a?.getAttribute('aria-label') || a?.textContent || '').replace(/^Địa chỉ:\s*/i, '').trim(); };
  let dia_chi = docDiaChi();
  const getItems = () => [...main.querySelectorAll('div.jftiEf')].filter(visible);
  const first = getItems()[0];
  if (!first) { alert(`${salon}\nChưa thấy đánh giá. Bấm tab "Bài đánh giá", chọn Sắp xếp › Mới nhất rồi chạy lại.`); return; }
  // Đổi "5 ngày trước" / "một tuần trước" thành số ngày ("năm ngày" = 5 ngày, "năm trước" = 1 năm)
  const NUM = {'một': 1, 'hai': 2, 'ba': 3, 'bốn': 4, 'năm': 5, 'sáu': 6};
  const soNgay = t => { t = (t || '').toLowerCase(); if (/phút|giờ|giây/.test(t)) return 0; const m = t.match(/(\d+|một|hai|ba|bốn|năm|sáu)\s*ngày/); if (m) return +m[1] || NUM[m[1]]; return /tuần|tháng|năm trước/.test(t) ? 99 : NaN; };
  const trongKhoang = t => soNgay(t) <= SO_NGAY;
  const quaKhoang = t => soNgay(t) > SO_NGAY;
  let box = first.parentElement;
  while (box && !(/(auto|scroll)/.test(getComputedStyle(box).overflowY) && box.scrollHeight > box.clientHeight + 5)) box = box.parentElement;
  box = box || document.scrollingElement;
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
    if (items.some(e => quaKhoang(e.querySelector('.rsqaWe')?.textContent || ''))) { toiHan = true; break; }
    const truoc = items.length;
    items[items.length - 1]?.scrollIntoView({block: 'end'});
    box.scrollTop = box.scrollHeight;
    for (let w = 0; w < 20 && getItems().length === truoc; w++) await sleep(400);
    dung = getItems().length === truoc ? dung + 1 : 0;
  }
  // mở hết các nút "Thêm" để đọc đủ nội dung
  getItems().forEach(e => e.querySelector('button.w8nwRe')?.click());
  await sleep(400);
  xong();
  const seen = new Set();
  const rows = getItems().filter(e => { const id = e.getAttribute('data-review-id'); if (seen.has(id)) return false; seen.add(id); return true; })
    .map(e => ({
      ten: e.querySelector('.d4r55')?.textContent.trim(),
      sao: +((e.querySelector('.kvMYJc')?.getAttribute('aria-label') || '').match(/\d/)?.[0] || 0),
      thoi_gian: e.querySelector('.rsqaWe')?.textContent.trim() || '',
      noi_dung: (e.querySelector('.wiI7pd')?.textContent || '').trim(),
    }))
    .filter(r => trongKhoang(r.thoi_gian));
  const tb = rows.length ? (rows.reduce((a, r) => a + r.sao, 0) / rows.length).toFixed(2) : '–';
  const xau = rows.filter(r => r.sao < 5).length;
  const esc = t => String(t ?? '').replace(/[&<>]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;'}[c]));
  document.getElementById('doc7-report')?.remove();
  const panel = document.createElement('div');
  panel.id = 'doc7-report';
  panel.style.cssText = 'position:fixed;inset:24px;z-index:2147483647;background:#fff;color:#14211f;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.35);font:15px/1.5 system-ui,sans-serif;display:flex;flex-direction:column;overflow:hidden';
  panel.innerHTML = `
    <div style="padding:16px 20px;border-bottom:1px solid #e3ebe8;display:flex;gap:12px;align-items:center;flex-wrap:wrap">
      <div style="flex:1;min-width:0"><b style="font-size:18px">📖 ${esc(salon)} · 7 ngày gần nhất</b><div style="color:#5b6b67;font-size:13px">${esc(dia_chi)}</div></div>
      <button id="doc7-copy" style="padding:8px 14px;border-radius:10px;border:0;background:#0f766e;color:#fff;font-weight:600;cursor:pointer">Copy nội dung</button>
      <button id="doc7-close" style="padding:8px 14px;border-radius:10px;border:1px solid #cfd9d5;background:#fff;cursor:pointer">Đóng</button>
    </div>
    <div style="padding:12px 20px;display:flex;gap:24px;flex-wrap:wrap;background:#f2f7f5">
      <div>Số bài: <b>${rows.length}</b></div><div>Điểm TB: <b>${tb}★</b></div>
      <div style="${xau ? 'color:#b91c1c;font-weight:700' : ''}">Dưới 5★: ${xau}</div>${toiHan ? '' : '<div style="color:#b91c1c;font-weight:700">⚠️ Chưa kéo tới bài cũ hơn, danh sách có thể THIẾU. Hãy chạy lại.</div>'}
    </div>
    <div style="overflow:auto;flex:1;padding:8px 20px 20px">
      ${rows.length ? rows.map((r, i) => `
        <div style="padding:12px 0;border-bottom:1px solid #e3ebe8;${r.sao < 5 ? 'background:#fef2f2;margin:0 -20px;padding:12px 20px' : ''}">
          <div><b>${i + 1}. ${esc(r.ten)}</b> · <span style="color:#d97706">${'★'.repeat(r.sao)}${'☆'.repeat(5 - r.sao)}</span> · <span style="color:#5b6b67">${esc(r.thoi_gian)}</span></div>
          <div style="margin-top:4px;white-space:pre-wrap">${esc(r.noi_dung) || '<i style="color:#8a9a96">(không viết nội dung)</i>'}</div>
        </div>`).join('') : '<p>Không có đánh giá nào trong 7 ngày gần nhất.</p>'}
    </div>`;
  document.body.appendChild(panel);
  panel.querySelector('#doc7-close').onclick = () => panel.remove();
  panel.querySelector('#doc7-copy').onclick = e => {
    const txt = `${salon}\n${dia_chi}\n7 ngày gần nhất: ${rows.length} bài · TB ${tb}★ · dưới 5★: ${xau}\n\n`
      + rows.map((r, i) => `${i + 1}. ${r.ten} – ${r.sao}★ – ${r.thoi_gian}\n${r.noi_dung || '(không viết nội dung)'}`).join('\n\n');
    navigator.clipboard.writeText(txt).then(() => { e.target.textContent = '✅ Đã copy'; }, () => { e.target.textContent = 'Không copy được'; });
  };
  console.table(rows);
})();
