// Báo cáo tổng hợp các salon: hiện bảng đầy đủ trên trang, có nút copy dán vào Excel/Sheets
(() => {
  let all = {}; try { all = JSON.parse(localStorage.getItem('dem_review_2ngay') || '{}'); } catch {}
  const list = Object.entries(all).map(([k, v]) => ({ten: v.ten || k, dia_chi: v.dia_chi || '', ...v}));
  if (!list.length) { alert('Chưa có salon nào được đếm.'); return; }
  list.sort((a, b) => (b.rating_map || 0) - (a.rating_map || 0));
  const rated = list.filter(x => x.rating_map);
  const tbThuong = rated.length ? (rated.reduce((a, x) => a + x.rating_map, 0) / rated.length).toFixed(2) : '?';
  const w = rated.filter(x => x.tong_review);
  const tongRv = w.reduce((a, x) => a + x.tong_review, 0);
  const tbTrongSo = tongRv ? (w.reduce((a, x) => a + x.rating_map * x.tong_review, 0) / tongRv).toFixed(2) : '?';
  const moi = list.reduce((a, x) => a + (x.bai_moi_2_ngay || 0), 0);
  const esc = t => String(t ?? '').replace(/[&<>]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;'}[c]));
  document.getElementById('dem-review-report-2ngay')?.remove();
  const box = document.createElement('div');
  box.id = 'dem-review-report-2ngay';
  box.style.cssText = 'position:fixed;inset:24px;z-index:2147483647;background:#fff;color:#14211f;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,.35);font:14px/1.45 system-ui,sans-serif;display:flex;flex-direction:column;overflow:hidden';
  const td = 'padding:8px 10px;border-bottom:1px solid #e3ebe8;text-align:left;vertical-align:top';
  box.innerHTML = `
    <div style="padding:16px 20px;border-bottom:1px solid #e3ebe8;display:flex;gap:12px;align-items:center;flex-wrap:wrap">
      <b style="font-size:18px;flex:1">📊 Báo cáo 2 ngày · ${list.length} salon</b>
      <button id="drr2-copy" style="padding:8px 14px;border-radius:10px;border:0;background:#0f766e;color:#fff;font-weight:600;cursor:pointer">Copy bảng (dán vào Excel/Sheets)</button>
      <button id="drr2-close" style="padding:8px 14px;border-radius:10px;border:1px solid #cfd9d5;background:#fff;cursor:pointer">Đóng</button>
    </div>
    <div style="padding:12px 20px;display:flex;gap:24px;flex-wrap:wrap;background:#f2f7f5">
      <div>⭐ Rating TB các salon: <b>${tbThuong}</b></div>
      <div>⭐ Rating TB theo số đánh giá: <b>${tbTrongSo}</b></div>
      <div>Tổng đánh giá trên Maps: <b>${tongRv.toLocaleString('vi-VN')}</b></div>
      <div>Bài mới 2 ngày: <b>${moi}</b></div>
    </div>
    <div style="overflow:auto;flex:1">
      <table style="border-collapse:collapse;width:100%">
        <thead style="position:sticky;top:0;background:#fff"><tr>
          ${['#', 'Salon', 'Địa chỉ', 'Rating Maps', 'Tổng ĐG', 'Mới 2 ngày', 'TB 2 ngày', 'Dưới 5★', 'Ngày đếm'].map(h => `<th style="${td};font-weight:700">${h}</th>`).join('')}
        </tr></thead>
        <tbody>${list.map((x, i) => `<tr>
          <td style="${td}">${i + 1}</td><td style="${td}"><b>${esc(x.ten)}</b></td><td style="${td};color:#5b6b67">${esc(x.dia_chi) || '—'}</td>
          <td style="${td}">${x.rating_map ?? '?'}★</td><td style="${td}">${x.tong_review ?? '?'}</td><td style="${td}">${x.bai_moi_2_ngay ?? 0}</td>
          <td style="${td}">${x.diem_tb ?? ''}</td><td style="${td};${x.duoi_5_sao ? 'color:#b91c1c;font-weight:700' : ''}">${x.duoi_5_sao ?? 0}</td><td style="${td}">${esc(x.ngay_dem)}</td>
        </tr>`).join('')}</tbody>
      </table>
    </div>`;
  document.body.appendChild(box);
  box.querySelector('#drr2-close').onclick = () => box.remove();
  box.querySelector('#drr2-copy').onclick = e => {
    const rows = [['Salon', 'Địa chỉ', 'Rating Maps', 'Tổng ĐG', 'Mới 2 ngày', 'TB 2 ngày', 'Dưới 5 sao', 'Ngày đếm'],
      ...list.map(x => [x.ten, x.dia_chi, x.rating_map ?? '', x.tong_review ?? '', x.bai_moi_2_ngay ?? 0, x.diem_tb ?? '', x.duoi_5_sao ?? 0, x.ngay_dem]),
      [], ['Rating TB các salon', tbThuong], ['Rating TB theo số đánh giá', tbTrongSo], ['Tổng đánh giá', tongRv], ['Bài mới 2 ngày', moi]];
    const tsv = rows.map(r => r.map(c => String(c).replace(/\t|\n/g, ' ')).join('\t')).join('\n');
    navigator.clipboard.writeText(tsv).then(() => { e.target.textContent = '✅ Đã copy, dán vào Excel/Sheets'; }, () => { e.target.textContent = 'Không copy được'; });
  };
  console.table(list);
})();
