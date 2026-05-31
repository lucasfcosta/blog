#!/usr/bin/env python3
"""Render an .excalidraw file to PNG using Excalidraw's own exporter.

Drives the system Chrome via Playwright (no browser download) and loads
Excalidraw's `exportToBlob` from a CDN, so the output keeps the real
hand-drawn (rough.js) strokes and the Virgil font.

Requirements:
  - Google Chrome installed (uses channel="chrome").
  - Python Playwright: `pip install playwright` (the browser binaries are
    NOT needed because we use the system Chrome channel).
  - Network access (pulls @excalidraw/excalidraw from esm.sh and the
    Virgil/Cascadia fonts from excalidraw.com at render time).

Usage:
  python3 scripts/render_excalidraw.py <in.excalidraw> <out.png> [scale] [bg]

  scale defaults to 2 (2x for crisp output).
  bg defaults to "transparent" (alpha PNG); pass a CSS color (e.g. "#ffffff")
  for a solid background.

Example:
  python3 scripts/render_excalidraw.py \\
    public/assets/backpressure-is-all-you-need/07-full-loop.excalidraw \\
    public/assets/backpressure-is-all-you-need/07-full-loop.png 2
"""
import json
import sys
import base64
from playwright.sync_api import sync_playwright

EXCALIDRAW_VERSION = "0.17.6"


def main() -> int:
    if len(sys.argv) < 3:
        print(__doc__)
        return 2

    in_path, out_path = sys.argv[1], sys.argv[2]
    scale = int(sys.argv[3]) if len(sys.argv) > 3 else 2
    # 4th arg: background. "transparent" (default) exports a PNG with an alpha
    # channel; otherwise pass a CSS color (e.g. "#ffffff") for a solid fill.
    bg = sys.argv[4] if len(sys.argv) > 4 else "transparent"
    transparent = bg == "transparent"
    scene = json.load(open(in_path))

    template = '''<!doctype html><html><head><meta charset="utf8"></head><body><script type="module">
import EXC from "https://esm.sh/@excalidraw/excalidraw@__VERSION__";
const scene = __SCENE__;
(async () => {
  try {
    // esm.sh exposes only the default export, so reach exportToBlob through it.
    const exportToBlob = EXC.exportToBlob || (EXC.default && EXC.default.exportToBlob);
    if (typeof exportToBlob !== "function") throw new Error("exportToBlob not found; keys=" + Object.keys(EXC));
    // Excalidraw only injects its font-faces when the React component mounts.
    // We call exportToBlob standalone, so register Virgil/Cascadia ourselves and wait,
    // otherwise text renders in a fallback font.
    const FONTS = [
      ["Virgil", "https://excalidraw.com/Virgil.woff2"],
      ["Cascadia", "https://excalidraw.com/Cascadia.woff2"],
    ];
    for (const [name, url] of FONTS) {
      try { const ff = new FontFace(name, "url(" + url + ")"); await ff.load(); document.fonts.add(ff); }
      catch (fe) { window.__fontwarn = (window.__fontwarn||"") + name + ":" + fe + "; "; }
    }
    await document.fonts.ready;
    const blob = await exportToBlob({
      elements: scene.elements,
      files: scene.files || null,
      appState: { ...(scene.appState||{}), exportBackground: __EXPORTBG__, viewBackgroundColor: "__VIEWBG__", exportWithDarkMode: false, exportPadding: 24 },
      mimeType: "image/png", quality: 1,
      getDimensions: (w, h) => ({ width: w * __SCALE__, height: h * __SCALE__, scale: __SCALE__ }),
    });
    const r = new FileReader();
    r.onload = () => { window.__png = r.result; window.__done = true; };
    r.onerror = (e) => { window.__err = "reader:" + e; window.__done = true; };
    r.readAsDataURL(blob);
  } catch (e) { window.__err = String(e && e.stack || e); window.__done = true; }
})();
</script></body></html>'''
    html = (
        template
        .replace("__VERSION__", EXCALIDRAW_VERSION)
        .replace("__EXPORTBG__", "false" if transparent else "true")
        .replace("__VIEWBG__", "#ffffff" if transparent else bg)
        .replace("__SCALE__", str(scale))
        .replace("__SCENE__", json.dumps(scene))  # last: scene JSON has no tokens
    )

    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)
        page = browser.new_page()
        page.on("console", lambda m: print("[page]", m.type, m.text) if m.type == "error" else None)
        page.set_content(html, wait_until="load")
        page.wait_for_function("window.__done === true", timeout=60000)
        err = page.evaluate("window.__err || null")
        if err:
            print("EXPORT ERROR:", err)
            browser.close()
            return 1
        data_url = page.evaluate("window.__png")
        browser.close()

    raw = base64.b64decode(data_url.split(",", 1)[1])
    with open(out_path, "wb") as f:
        f.write(raw)
    print("wrote", out_path, len(raw), "bytes")
    return 0


if __name__ == "__main__":
    sys.exit(main())
