#!/usr/bin/env python3
"""Regenerate favicons from src/assets/brand/mark.png (transparent source)."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MARK = ROOT / "src/assets/brand/mark.png"

OUTPUTS: dict[str, int] = {
    "src/assets/favicon-16.png": 16,
    "src/assets/favicon-32.png": 32,
    "src/assets/favicon-180.png": 180,
    "src/app/icon.png": 32,
    "src/app/apple-icon.png": 180,
}


def strip_near_white_background(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    w, h = img.size
    pixels = img.load()

    def is_bg(r: int, g: int, b: int, a: int) -> bool:
        return a > 0 and r > 235 and g > 235 and b > 235

    visited = [[False] * w for _ in range(h)]
    queue: deque[tuple[int, int]] = deque()

    for x, y in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)):
        if is_bg(*pixels[x, y]):
            queue.append((x, y))
            visited[y][x] = True

    while queue:
        x, y = queue.popleft()
        r, g, b, _a = pixels[x, y]
        pixels[x, y] = (r, g, b, 0)
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
                if is_bg(*pixels[nx, ny]):
                    visited[ny][nx] = True
                    queue.append((nx, ny))

    return img


def main() -> None:
    mark = Image.open(MARK).convert("RGBA")

    for rel, size in OUTPUTS.items():
        out = ROOT / rel
        out.parent.mkdir(parents=True, exist_ok=True)
        resized = mark.resize((size, size), Image.Resampling.LANCZOS)
        cleaned = strip_near_white_background(resized)
        cleaned.save(out, format="PNG")
        print(f"Wrote {rel} ({size}x{size})")


if __name__ == "__main__":
    main()
