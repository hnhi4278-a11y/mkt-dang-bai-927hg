// Xem bảng tổng hợp các salon đã đếm + rating trung bình toàn chuỗi
(() => {
  let all = {}; try { all = JSON.parse(localStorage.getItem('dem_review') || '{}'); } catch {}
  const names = Object.keys(all);
  if (!names.length) { alert('Chưa có salon nào được đếm.'); return; }
  const rated = names.map(n => all[n]).filter(x => x.rating_map);
  const tbThuong = rated.length ? (rated.reduce((a, x) => a + x.rating_map, 0) / rated.length).toFixed(2) : '?';
  const w = rated.filter(x => x.tong_review);
  const tongRv = w.reduce((a, x) => a + x.tong_review, 0);
  const tbTrongSo = tongRv ? (w.reduce((a, x) => a + x.rating_map * x.tong_review, 0) / tongRv).toFixed(2) : '?';
  const moi = names.reduce((a, n) => a + (all[n].bai_moi_7_ngay || 0), 0);
  console.table(all);
  console.log(`⭐ Rating TB các salon: ${tbThuong} | Rating TB theo số đánh giá: ${tbTrongSo} | Tổng đánh giá: ${tongRv} | Bài mới 7 ngày: ${moi}`);
  const sorted = [...names].sort((a, b) => (all[b].rating_map || 0) - (all[a].rating_map || 0));
  alert('📊 Tổng hợp ' + names.length + ' salon\n'
    + `⭐ Rating TB các salon: ${tbThuong}\n⭐ Rating TB theo số đánh giá: ${tbTrongSo}\nTổng đánh giá trên Maps: ${tongRv}\nBài mới 7 ngày: ${moi}\n\n`
    + sorted.map(n => `${n}\n  ${all[n].rating_map ?? '?'}★ (${all[n].tong_review ?? '?'}) · ${all[n].bai_moi_7_ngay} bài mới · ${all[n].duoi_5_sao} bài dưới 5★`).join('\n\n'));
})();
