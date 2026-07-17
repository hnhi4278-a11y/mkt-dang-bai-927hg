import json
import os
import uuid
from datetime import date, datetime, timedelta

from flask import Flask, redirect, render_template, request, url_for

app = Flask(__name__)

DATA_PATH = os.path.join(os.path.dirname(__file__), "data", "submissions.json")

# Thứ tự xoay vòng: bắt đầu từ người đã làm thực tế ngày 2026-07-17 (Nguyễn Hoàng Kha),
# phần còn lại giữ nguyên thứ tự cũ nối vào sau để công bằng cho các vòng kế tiếp.
STYLISTS = [
    "Nguyễn Hoàng Kha",
    "Huỳnh Bá Thành",
    "Võ Văn Trí",
    "Phạm Văn Phát",
    "Huỳnh Văn Kha",
    "Nguyễn Trung Thực",
    "Trần Nhất Duyên",
    "Trương Phúc Tỷ",
    "Phùng Văn Đỗ Đạt",
    "Nguyễn Chí Khanh",
]

# Bắt đầu từ Nguyễn Thị Thúy Hằng (đã làm thực tế ngày 2026-07-17)
SKINNERS = [
    "Nguyễn Thị Thúy Hằng",
    "Nguyễn Thị Kim Ngân",
    "Ngô Thị Ngọc Ánh",
    "Nguyễn Hoàng Triệu Vy",
    "Phù Thị Hoàng Uyên",
    "Trương Huỳnh Nhi",
    "Đỗ Thị Linh",
    "Ngô Thuỳ Phương",
    "Cao Thị Kim Chi",
]

PLATFORMS = ["Facebook", "TikTok", "Instagram", "Zalo", "Khác"]

# Neo lịch xoay vòng từ ngày này để lịch gợi ý cố định, không đổi mỗi lần load trang
SCHEDULE_ANCHOR = date(2026, 7, 17)  # ngày Nguyễn Hoàng Kha + Thúy Hằng làm clip


def load_submissions():
    with open(DATA_PATH, encoding="utf-8") as f:
        return json.load(f)


def save_submissions(rows):
    with open(DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False, indent=2)


def suggested_for(d: date):
    offset = (d - SCHEDULE_ANCHOR).days
    stylist = STYLISTS[offset % len(STYLISTS)]
    skinner = SKINNERS[offset % len(SKINNERS)]
    return stylist, skinner


def suggested_schedule(days=14, start: date = None):
    start = start or date.today()
    out = []
    for i in range(days):
        d = start + timedelta(days=i)
        stylist, skinner = suggested_for(d)
        out.append({"date": d.isoformat(), "stylist": stylist, "skinner": skinner})
    return out


@app.route("/", methods=["GET"])
def form():
    today = date.today()
    stylist_today, skinner_today = suggested_for(today)
    return render_template(
        "form.html",
        stylists=STYLISTS,
        skinners=SKINNERS,
        platforms=PLATFORMS,
        today=today.isoformat(),
        stylist_today=stylist_today,
        skinner_today=skinner_today,
    )


@app.route("/submit", methods=["POST"])
def submit():
    dept = request.form.get("dept", "").strip()
    name = request.form.get("name", "").strip()
    platform = request.form.get("platform", "").strip()
    link = request.form.get("link", "").strip()
    post_date = request.form.get("date", "").strip() or date.today().isoformat()

    if not (dept and name and link):
        return redirect(url_for("form"))

    rows = load_submissions()
    rows.append(
        {
            "id": uuid.uuid4().hex[:8],
            "date": post_date,
            "name": name,
            "dept": dept,
            "platform": platform,
            "link": link,
            "created_at": datetime.now().isoformat(timespec="seconds"),
        }
    )
    save_submissions(rows)
    return redirect(url_for("report", ok=1))


@app.route("/bao-cao", methods=["GET"])
def report():
    rows = load_submissions()
    rows.sort(key=lambda r: (r["date"], r["created_at"]), reverse=True)
    schedule = suggested_schedule(days=14)
    return render_template(
        "report.html",
        rows=rows,
        schedule=schedule,
        today=date.today().isoformat(),
        ok=request.args.get("ok"),
    )


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
