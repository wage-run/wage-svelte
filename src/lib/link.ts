import { derived, type Readable } from "svelte/store"
import { page } from "$app/stores"
import { browser } from "$app/environment"
import { getUri } from "./config"

export const link = <T = any>(data: T, ep?: string) => {
	let uri: string
	let source: Readable<T> = derived([page], ([page], set) => {
		set(data)
		if (!browser) {
			return () => {}
		}
		uri = ep ?? getUri(page.url)
		let es: EventSource
		let connect = (retry: (re: any) => void) => {
			es = new EventSource(uri)
			es.addEventListener("message", (e) => {
				let z = JSON.parse(e.data)
				set(z)
			})
			es.addEventListener("error", function (e) {
				setTimeout(retry, 1e3, retry)
			})
		}
		connect(connect)
		return () => {
			es?.close()
		}
	})
	return {
		subscribe: source.subscribe,
		set: (t: any) => {
			fetch(uri, { method: "post", body: JSON.stringify(t) })
		},
	}
}

export default link
