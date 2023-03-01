export let getUri = (url: URL): string => {
	url.pathname = `/live/events` + url.pathname
	return url.toString()
}

export const setUriGenerator = (g: typeof getUri) => {
	getUri = g
}
