import { initGoFetch } from "./lib/sw.js"

initGoFetch({
	endpoint: { ws: "/live" },
	wasmUrl: "/wshttp.wasm?v=1",
})
