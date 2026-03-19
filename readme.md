# Out to C

a draft YSWS where you sail out to sea on the hunt for treasure, by coding C. 

<img src="banner.png" width=450>

check it out! [https://ingobeans.github.io/out-to-c/](https://ingobeans.github.io/out-to-c/)

---

this repo is currently just the homepage. if this YSWS is to be actualized, it would probably be a Ruby on Rails backend with Hackclub OpenID auth.

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