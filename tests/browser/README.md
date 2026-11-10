# Optional browser QA

Run from the project root. Install Playwright 1.51.1 and @sparticuz/chromium 133.0.0 under qa091 with npm --prefix qa091. Decompress node_modules/@sparticuz/chromium/bin/chromium.br to qa091/chromium and chmod 755. Create qa091/assets QA-only PNG copies with world images at most 768×512, and sprites at most 192×192 (preserve aspect ratio). These must not replace assets in the project.

Run `NODE_PATH=./qa091/node_modules node tests/browser/verify.cjs`. It uses inline assets, mocked storage/audio and an explicit test clock. Create the qa095 directory before running. Screenshots are intermediate QA output under qa095, not distribution assets. Actual device/network testing remains separate.

EXTRA=1 tests shrink the viewport after entering gameplay to simulate mobile browser toolbars (667×280, 568×260). Menu flow remains tested at the initial 320px height for these two cases.
