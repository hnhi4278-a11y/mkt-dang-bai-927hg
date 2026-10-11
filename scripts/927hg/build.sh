#!/usr/bin/env bash
# Dựng lại báo cáo "Khách tiêu chuẩn - Salon 927 HG" từ dữ liệu mới nhất.
# Chạy: bash scripts/927hg/build.sh
# Kết quả: ghi ra bao-cao-927hg.html ở gốc repo (đã nhúng dữ liệu, tự chứa).
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
BASE="https://reports.30shine.com/0019_baocao-sale-v7"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "→ Tải dữ liệu nguồn..."
curl -sS -fL "$BASE/sale-dim-salon/sale-dim-salon.json" -o "$TMP/dim.json"
curl -sS -fL "$BASE/sale-std-customer-detail/sale-std-customer-detail.json" -o "$TMP/detail.json"

echo "→ Tổng hợp dữ liệu salon 927 HG..."
python3 -I "$HERE/mkdata.py" "$TMP/detail.json" "$TMP/dim.json" "$TMP/data.json"

echo "→ Nhúng dữ liệu vào trang..."
python3 -I - "$HERE/tpl.html" "$TMP/data.json" "$ROOT/bao-cao-927hg.html" <<'PY'
import sys
tpl, data, out = sys.argv[1], sys.argv[2], sys.argv[3]
t = open(tpl, encoding='utf-8').read()
d = open(data, encoding='utf-8').read()
open(out, 'w', encoding='utf-8').write(t.replace('/*__DATA__*/', 'const DATA=' + d + ';'))
print('  Đã ghi:', out)
PY

echo "✓ Xong. Tiếp theo: republish bao-cao-927hg.html lên artifact (giữ nguyên URL)."
