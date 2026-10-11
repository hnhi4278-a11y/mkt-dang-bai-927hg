// Xem bảng tổng hợp các salon đã đếm
(() => {
  let all = {}; try { all = JSON.parse(localStorage.getItem('dem_review') || '{}'); } catch {}
  const names = Object.keys(all);
  if (!names.length) { alert('Chưa có salon nào được đếm.'); return; }
  console.table(all);
  alert('📊 Tổng hợp\n\n' + names.map(n => `${n}\n  ${all[n].bai_moi_7_ngay} bài mới · ${all[n].diem_tb}★ · ${all[n].duoi_5_sao} bài dưới 5★ · ${all[n].ngay_dem}`).join('\n\n'));
})();
