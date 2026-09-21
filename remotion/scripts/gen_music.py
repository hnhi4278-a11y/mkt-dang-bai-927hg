"""Regenerate the synthesized background music loop in public/sfx/bg-music.wav.

No external dependencies (stdlib only). The duration must match the
ThirtyShineReel composition's total length exactly (TOTAL_FRAMES / fps in
src/ThirtyShineReel/clips.ts) or the track will cut short or leave silence
at the end.

Usage:
    python3 scripts/gen_music.py [duration_seconds]
"""

import wave
import struct
import math
import random
import os
import sys

SR = 44100
BPM = 128
BEAT = 60.0 / BPM  # seconds per beat
OUT_PATH = os.path.join(os.path.dirname(__file__), "..", "public", "sfx", "bg-music.wav")


def write_wav(path, samples):
    peak = max(1e-9, max(abs(s) for s in samples))
    scale = 0.9 / peak
    with wave.open(path, "w") as f:
        f.setnchannels(1)
        f.setsampwidth(2)
        f.setframerate(SR)
        frames = bytearray()
        for s in samples:
            v = int(max(-1.0, min(1.0, s * scale)) * 32767)
            frames += struct.pack("<h", v)
        f.writeframes(bytes(frames))


def add(buf, start_sample, snippet, gain=1.0):
    for i, s in enumerate(snippet):
        idx = start_sample + i
        if 0 <= idx < len(buf):
            buf[idx] += s * gain


def kick(duration=0.16):
    n = int(SR * duration)
    out = []
    phase = 0.0
    for i in range(n):
        t = i / SR
        freq = 150 * math.exp(-18 * t) + 42
        phase += 2 * math.pi * freq / SR
        env = math.exp(-14 * t)
        out.append(math.sin(phase) * env)
    return out


def hihat(duration=0.05, gain=0.5):
    n = int(SR * duration)
    out = []
    for i in range(n):
        t = i / SR
        noise = random.uniform(-1, 1)
        env = math.exp(-70 * t)
        out.append(noise * env * gain)
    return out


def bass_note(freq, duration, gain=1.0):
    n = int(SR * duration)
    out = []
    phase = 0.0
    for i in range(n):
        t = i / SR
        # slightly detuned two-oscillator saw-ish tone via sine + 2nd harmonic
        phase += 2 * math.pi * freq / SR
        val = math.sin(phase) * 0.8 + math.sin(phase * 2) * 0.2
        attack = min(1.0, t / 0.01)
        decay = math.exp(-2.2 * t)
        out.append(val * attack * decay * gain)
    return out


def pluck(freq, duration=0.22, gain=0.55):
    n = int(SR * duration)
    out = []
    phase = 0.0
    for i in range(n):
        t = i / SR
        phase += 2 * math.pi * freq / SR
        val = math.sin(phase) + 0.35 * math.sin(phase * 2)
        env = math.exp(-9 * t)
        out.append(val * env * gain)
    return out


def build(total_duration):
    n_total = int(SR * total_duration)
    buf = [0.0] * n_total

    # 4-bar bass progression (root notes, Hz)
    bass_notes = [110.00, 110.00, 87.31, 98.00]  # A2, A2, F2, G2
    # simple pentatonic pluck motif (4 hits/bar)
    pluck_pattern = [440.00, 523.25, 587.33, 659.25]  # A4 C5 D5 E4-ish hook

    t = 0.0
    beat_i = 0
    while t < total_duration:
        bar_i = beat_i // 4
        beat_in_bar = beat_i % 4
        start = int(t * SR)

        # kick on every beat
        add(buf, start, kick(), gain=0.85)

        # hihat on off-8th-notes
        add(buf, int((t + BEAT / 2) * SR), hihat(), gain=0.35)

        # bass note once per bar, on beat 1
        if beat_in_bar == 0:
            note = bass_notes[bar_i % len(bass_notes)]
            add(buf, start, bass_note(note, BEAT * 4 * 0.9), gain=0.55)

        # pluck hook every beat, cycling the motif
        pfreq = pluck_pattern[beat_i % len(pluck_pattern)]
        add(buf, start + int(SR * 0.02), pluck(pfreq), gain=0.30)

        t += BEAT
        beat_i += 1

    # overall fade in (0.4s) and fade out (last 1.2s)
    fade_in = int(SR * 0.4)
    fade_out = int(SR * 1.2)
    for i in range(fade_in):
        buf[i] *= i / fade_in
    for i in range(fade_out):
        idx = n_total - fade_out + i
        buf[idx] *= 1 - (i / fade_out)

    return buf


if __name__ == "__main__":
    duration = float(sys.argv[1]) if len(sys.argv) > 1 else 25.2
    track = build(duration)
    write_wav(OUT_PATH, track)
    print("done", len(track) / SR, "s ->", OUT_PATH)
