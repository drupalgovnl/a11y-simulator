const esbuild = require("esbuild");

esbuild.build({
    entryPoints: [
        "src/EventListeners.ts",
        "src/Content.ts",
    ],
    bundle: true,
    outdir: "dist",
    format: "iife",
    sourcemap: true,
    minify: false,
    target: ["chrome100"]
})