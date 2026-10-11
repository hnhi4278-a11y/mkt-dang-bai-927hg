import json, sys
p,sm,out=sys.argv[1],sys.argv[2],sys.argv[3]
with open(p) as f: data=json.load(f)['data']
rows=[r for r in data if r.get('SalonId')==22]
# DEDUP theo BillId: 1 hoa don = 1 dong (gom cac dong dich vu)
# Giu dong "dai dien": uu tien dong co Stylist khong rong; dieu kien bill-level lap lai nen bat ky dong nao cung dung
bybill={}
for r in rows:
    b=r.get('BillId')
    if b not in bybill: bybill[b]=r
    else:
        # neu dong cu trong stylist ma dong moi co -> thay
        if not (bybill[b].get('Stylist')) and r.get('Stylist'): bybill[b]=r
uni=list(bybill.values())
dates=sorted(set(r['BillDate'] for r in uni if r.get('BillDate')))
di={d:i for i,d in enumerate(dates)}
styl=sorted(set((r.get('Stylist') or '(trống)') for r in uni))
si={s:i for i,s in enumerate(styl)}
def code(v): return 1 if v=='Đạt' else (2 if v=='Không Đạt' else 0)
def nocut(r):
    # khong co dich vu cat/dich vu thuc: khong stylist, khong thoi gian chuan, khong dieu kien gia/thoi gian
    return (r.get('Stylist') is None and r.get('TimeStd') is None
            and r.get('ServiceCondition') is None and r.get('TimeCondition') is None)
def excode(r):
    # 0=loi that | 1=chi ban SP/khong DV | 2=chi LRT
    if not nocut(r): return 0
    return 2 if r.get('LRTCondition') is not None else 1
agg=[]; fails=[]
for r in uni:
    ok=1 if r.get('ResultCondition')=='Đạt' else 0
    s=si[r.get('Stylist') or '(trống)']
    agg.append([di[r['BillDate']], ok, s])
    if not ok:
        im,tm,sv=code(r.get('ImageCondition')),code(r.get('TimeCondition')),code(r.get('ServiceCondition'))
        std=r.get('TimeStd'); tt=(r.get('TimeSt') or 0)+(r.get('TimeSk') or 0)
        tnote=''
        if tm==2:
            if std:
                pct=tt/std*100; k='quá nhanh' if pct<70 else ('quá lâu' if pct>300 else '')
                tnote=f'{tt}p / chuẩn {std}p = {pct:.0f}% {k}'
            else: tnote=f'{tt}p / chuẩn ?'
        # nguoi chiu trach nhiem: tho cat (stylist) neu co, nguoc lai la skinner (bill goi/khong cat)
        sty=r.get('Stylist'); sk=(r.get('Skinner') or '').strip()
        rp = sty if sty else (sk if sk else '(trống)')
        role = 'Stylist' if sty else ('Skinner' if sk else '—')
        fails.append({'di':di[r['BillDate']],'b':r.get('BillId'),'c':r.get('CustomerId'),
            's':si[r.get('Stylist') or '(trống)'],'k':sk,'rp':rp,'role':role,
            'im':im,'tm':tm,'sv':sv,'tn':tnote,'ex':excode(r)})
obj={'salon':'927 HG','dates':dates,'styl':styl,'agg':agg,'fails':fails}
import os
with open(out,'w') as f: json.dump(obj,f,ensure_ascii=False,separators=(',',':'))
tot=len(agg); dat=sum(a[1] for a in agg)
print("Sau dedup: hoa don",tot,"| dat",dat,f"({dat/tot*100:.1f}%)","| khong dat",tot-dat,"| size",os.path.getsize(out))
