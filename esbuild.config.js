const esbuild = require("esbuild");

esbuild.build({
    entryPoints: [
        "src/EventListeners.ts",
        "src/content.ts",
    ],
    bundle: true,
    outdir: "dist",
    format: "iife",
    sourcemap: true,
    minify: false,
    target: ["chrome100"]
})