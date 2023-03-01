import type { Page } from '@sveltejs/kit'

export let getUri = (page: Page): string => {
	return `/live/events${page.url.pathname}`
}

export const setUriGenerator = (g: typeof getUri) => {
	getUri = g
}
