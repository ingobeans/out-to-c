# Out to C

this was just the draft for my YSWS which runs 14th Aug to 7th Sept (2026).

the full app with the backend is at [hackclub/out-to-c](https://github.com/hackclub/out-to-c)

---

a draft for a YSWS where you sail out to sea on the hunt for treasure, by coding C. 

<img src="banner.png" width=450>

check it out! [https://out-to-c.dino.icu/](https://out-to-c.dino.icu/)

---

built with plain html/css + ThreeJS for the 3D background. for the next version, I will probably replace ThreeJS with Rust WebGL since I'm pretty sure it loads faster.

no ai <3

## Building

all js dependencies can be bundled in to a single minified js file. 

you'll need npm first, then install threejs and esbuild with:
```bash
npm install three esbuild
```

then build the minified file using:
```bash
npx esbuild --bundle main.js --format=esm --minify > min.js
```
