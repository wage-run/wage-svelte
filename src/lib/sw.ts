import '@wage/wshttp'
// import wasmUrl from '@wage/wshttp/wshttp.wasm?url'

export const initGoFetch = (endpoint: string, wasmUrl?: string) => {
	if (typeof wasmUrl !== 'string' || wasmUrl.length === 0) {
		throw new Error('wasmUrl is required for now')
	}

	const go = new Go()
	let u = new URL(new Request(endpoint).url)
	const protolsMap: { [k: string]: string } = {
		'http:': 'ws:',
		'https:': 'wss:',
	}
	u.protocol = protolsMap[u.protocol]
	// @ts-ignore
	globalThis['WageEndpoint'] = u.toString()

	const goFetchInit = Promise.resolve()
		.then(() => ({ default: wasmUrl }))
		.then(({ default: wasmUrl }) => {
			// return init(go.importObject)
			var i = WebAssembly.instantiateStreaming(fetch(wasmUrl), go.importObject)
			return i.then((r) => r.instance)
		})
		.then((instance) => {
			go.run(instance)
		})

	addEventListener('fetch', (e) => {
		let { pathname } = new URL(e.request.url)
		if (pathname.startsWith('/live')) {
			return e.respondWith(goFetchInit.then(() => GoFetch(e.request)))
		}
		return e
	})

	addEventListener('install', (e) => {
		skipWaiting()
	})

	addEventListener('activate', (e) => {
		clients.claim()
	})
}
