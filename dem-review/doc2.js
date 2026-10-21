// Đọc đánh giá trong 2 ngày gần nhất của salon đang mở (phút/giờ trước, 1 ngày trước, 2 ngày trước)
(async () => {
  const SO_NGAY = 2;
  const visible = el => el.getClientRects().length > 0 && el.offsetParent !== null;
  const h1 = [...document.querySelectorAll('h1')].find(e => visible(e) && e.textContent.trim());
  const salon = (h1?.textContent || document.title.replace(/\s*-\s*Google Maps.*$/i, '')).trim() || 'Không rõ tên';
  const addrEl = document.querySelector('button[data-item-id="address"]');
  const dia_chi = (addrEl?.getAttribute('aria-label') || addrEl?.textContent || '').replace(/^Địa chỉ:\s*/i, '').trim();
  const getItems = () => [...document.querySelectorAll('div.jftiEf')].filter(visible);
  const first = getItems()[0];
  if (!first) { alert(`${salon}\nChưa thấy đánh giá. Bấm tab "Bài đánh giá", chọn Sắp xếp › Mới nhất rồi chạy lại.`); return; }
  const trongKhoang = t => /phút|giờ/.test(t) || (+(t.match(/(\d+)\s*ngày/) || [])[1] <= SO_NGAY);
  const quaKhoang = t => /tuần|tháng|năm/.test(t) || (+(t.match(/(\d+)\s*ngày/) || [])[1] > SO_NGAY);
  let box = first.parentElement;
  while (box && box.scrollHeight <= box.clientHeight + 5) box = box.parentElement;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  for (let i = 0; i < 40; i++) {
    const dates = getItems().map(e => e.querySelector('.rsqaWe')?.textContent || '');
    if (dates.some(quaKhoang)) break;
    box.scrollBy(0, 3000);
    await sleep(1200);
  }
  // mở hết các nút "Thêm" để đọc đủ nội dung
  getItems().forEach(e => e.querySelector('button.w8nwRe')?.click());
  await sleep(400);
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
  document.getElementById('doc2-report')?.remove();
  const panel = document.createElement('div');
  panel.id = 'doc2-report';
  panel.style.cssText = 'position:fixed;inset:24px;z-index:2147483647;background:#fff;color:#14211f;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.35);font:15px/1.5 system-ui,sans-serif;display:flex;flex-direction:column;overflow:hidden';
  panel.innerHTML = `
    <div style="padding:16px 20px;border-bottom:1px solid #e3ebe8;display:flex;gap:12px;align-items:center;flex-wrap:wrap">
      <div style="flex:1;min-width:0"><b style="font-size:18px">📖 ${esc(salon)} · ${SO_NGAY} ngày gần nhất</b><div style="color:#5b6b67;font-size:13px">${esc(dia_chi)}</div></div>
      <button id="doc2-copy" style="padding:8px 14px;border-radius:10px;border:0;background:#0f766e;color:#fff;font-weight:600;cursor:pointer">Copy nội dung</button>
      <button id="doc2-close" style="padding:8px 14px;border-radius:10px;border:1px solid #cfd9d5;background:#fff;cursor:pointer">Đóng</button>
    </div>
    <div style="padding:12px 20px;display:flex;gap:24px;flex-wrap:wrap;background:#f2f7f5">
      <div>Số bài: <b>${rows.length}</b></div><div>Điểm TB: <b>${tb}★</b></div>
      <div style="${xau ? 'color:#b91c1c;font-weight:700' : ''}">Dưới 5★: ${xau}</div>
    </div>
    <div style="overflow:auto;flex:1;padding:8px 20px 20px">
      ${rows.length ? rows.map((r, i) => `
        <div style="padding:12px 0;border-bottom:1px solid #e3ebe8;${r.sao < 5 ? 'background:#fef2f2;margin:0 -20px;padding:12px 20px' : ''}">
          <div><b>${i + 1}. ${esc(r.ten)}</b> · <span style="color:#d97706">${'★'.repeat(r.sao)}${'☆'.repeat(5 - r.sao)}</span> · <span style="color:#5b6b67">${esc(r.thoi_gian)}</span></div>
          <div style="margin-top:4px;white-space:pre-wrap">${esc(r.noi_dung) || '<i style="color:#8a9a96">(không viết nội dung)</i>'}</div>
        </div>`).join('') : '<p>Không có đánh giá nào trong ' + SO_NGAY + ' ngày gần nhất.</p>'}
    </div>`;
  document.body.appendChild(panel);
  panel.querySelector('#doc2-close').onclick = () => panel.remove();
  panel.querySelector('#doc2-copy').onclick = e => {
    const txt = `${salon}\n${dia_chi}\n${SO_NGAY} ngày gần nhất: ${rows.length} bài · TB ${tb}★ · dưới 5★: ${xau}\n\n`
      + rows.map((r, i) => `${i + 1}. ${r.ten} – ${r.sao}★ – ${r.thoi_gian}\n${r.noi_dung || '(không viết nội dung)'}`).join('\n\n');
    navigator.clipboard.writeText(txt).then(() => { e.target.textContent = '✅ Đã copy'; }, () => { e.target.textContent = 'Không copy được'; });
  };
  console.table(rows);
})();
