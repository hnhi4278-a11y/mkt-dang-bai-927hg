#!/usr/bin/env python3
"""Nhúng lại nội dung các file *.js vào page.html (biến CODES). Chạy sau khi sửa lệnh."""
import json, pathlib
d = pathlib.Path(__file__).parent
strip = lambda f: '\n'.join(l for l in (d / f).read_text().split('\n') if not l.strip().startswith('//'))
keys = ['dem', 'xem', 'xoa', 'dem2', 'xem2', 'xoa2', 'doc2', 'doc7']
codes = {k: strip(k + '.js') for k in keys}
p = d / 'page.html'
s = p.read_text()
i = s.index('const CODES = '); j = s.index(';\nfunction copy')
p.write_text(s[:i] + 'const CODES = ' + json.dumps(codes, ensure_ascii=False) + s[j:])
print('page.html updated:', ', '.join(keys))
