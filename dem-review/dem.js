// Đếm đánh giá Google Maps mới trong 7 ngày (chạy trên trang salon, tab "Bài đánh giá", sắp xếp "Mới nhất")
(async () => {
  const salon = document.title.replace(/\s*-\s*Google Maps.*$/i, '').trim() || 'Không rõ tên';
  const visible = el => el.getClientRects().length > 0 && el.offsetParent !== null;
  const getItems = () => [...document.querySelectorAll('div.jftiEf')].filter(visible);
  const first = getItems()[0];
  if (!first) { alert(`${salon}\nChưa thấy đánh giá. Bấm tab "Bài đánh giá", chọn Sắp xếp › Mới nhất rồi chạy lại.`); return; }
  let box = first.parentElement;
  while (box && box.scrollHeight <= box.clientHeight + 5) box = box.parentElement;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  for (let i = 0; i < 60; i++) {
    const dates = getItems().map(e => e.querySelector('.rsqaWe')?.textContent || '');
    if (dates.some(d => /tuần|tháng|năm/.test(d))) break;
    box.scrollBy(0, 3000);
    await sleep(1200);
  }
  const seen = new Set();
  const rows = getItems().filter(e => { const id = e.getAttribute('data-review-id'); if (seen.has(id)) return false; seen.add(id); return true; })
    .map(e => ({
      ten: e.querySelector('.d4r55')?.textContent.trim(),
      sao: +((e.querySelector('.kvMYJc')?.getAttribute('aria-label') || '').match(/\d/)?.[0] || 0),
      thoi_gian: e.querySelector('.rsqaWe')?.textContent.trim(),
      noi_dung: (e.querySelector('.wiI7pd')?.textContent || '').trim().slice(0, 80),
    }));
  const moi = rows.filter(r => /phút|giờ|ngày/.test(r.thoi_gian || ''));
  const tb = moi.length ? +(moi.reduce((a, r) => a + r.sao, 0) / moi.length).toFixed(2) : 0;
  console.log(`📍 ${salon}`); console.table(moi);
  let all = {}; try { all = JSON.parse(localStorage.getItem('dem_review') || '{}'); } catch {}
  all[salon] = {bai_moi_7_ngay: moi.length, diem_tb: tb, duoi_5_sao: moi.filter(r => r.sao < 5).length, ngay_dem: new Date().toLocaleDateString('vi-VN')};
  try { localStorage.setItem('dem_review', JSON.stringify(all)); } catch {}
  console.log('📊 Tổng hợp các salon:'); console.table(all);
  alert(`${salon}\nĐánh giá mới trong 7 ngày: ${moi.length} bài\nĐiểm trung bình: ${tb} sao`);
})();
