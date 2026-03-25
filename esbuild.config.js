const esbuild = require("esbuild");

esbuild.build({
    entryPoints: [
        "src/listeners.ts",
        "src/content.ts",
        "src/functions/overlay.ts",
    ],
    bundle: true,
    outdir: "dist",
    format: "iife",
    sourcemap: true,
    minify: false,
    target: ["chrome100"]
})