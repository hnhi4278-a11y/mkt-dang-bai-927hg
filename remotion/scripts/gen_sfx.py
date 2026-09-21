"""Regenerate the short sound effects in public/sfx/.

No external dependencies (stdlib only). Run from anywhere:
    python3 scripts/gen_sfx.py
"""

import wave
import struct
import math
import random
import os

SR = 44100
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "sfx")


def write_wav(path, samples):
    peak = max(1e-9, max(abs(s) for s in samples))
    scale = 0.92 / peak
    with wave.open(path, "w") as f:
        f.setnchannels(1)
        f.setsampwidth(2)
        f.setframerate(SR)
        frames = bytearray()
        for s in samples:
            v = int(max(-1.0, min(1.0, s * scale)) * 32767)
            frames += struct.pack("<h", v)
        f.writeframes(bytes(frames))


def whoosh(duration=0.35):
    n = int(SR * duration)
    out = []
    lp = 0.0
    for i in range(n):
        t = i / SR
        noise = random.uniform(-1, 1)
        # soften white noise into an airy "whoosh" via a simple low-pass
        lp = lp * 0.86 + noise * 0.14
        attack = min(1.0, t / 0.03)
        decay = math.exp(-3.2 * t / duration)
        env = attack * decay
        out.append(lp * env)
    return out


def pop(duration=0.13):
    n = int(SR * duration)
    out = []
    phase = 0.0
    for i in range(n):
        t = i / SR
        freq = 1300 - 700 * (t / duration)  # quick downward chirp
        phase += 2 * math.pi * freq / SR
        env = math.exp(-18 * t)
        out.append(math.sin(phase) * env)
    return out


def chime(duration=0.75):
    n = int(SR * duration)
    out = []
    p1 = p2 = 0.0
    f1, f2 = 880.0, 1318.51  # A5 + E6
    for i in range(n):
        t = i / SR
        p1 += 2 * math.pi * f1 / SR
        p2 += 2 * math.pi * f2 / SR
        env = math.exp(-3.0 * t)
        out.append((math.sin(p1) * 0.6 + math.sin(p2) * 0.4) * env)
    return out


if __name__ == "__main__":
    os.makedirs(OUT_DIR, exist_ok=True)
    write_wav(os.path.join(OUT_DIR, "whoosh.wav"), whoosh())
    write_wav(os.path.join(OUT_DIR, "pop.wav"), pop())
    write_wav(os.path.join(OUT_DIR, "chime.wav"), chime())
    print("done")
