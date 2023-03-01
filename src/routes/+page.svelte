<script lang="ts">
	import { link } from '$lib'
	let data: { count: number } = { count: 59 }
	let linkdata = link(data)
</script>

<div>
	<h1>{$linkdata.count}</h1>
	<button>add</button>
</div>
