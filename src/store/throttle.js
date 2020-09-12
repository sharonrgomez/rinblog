export const throttle = (callback, limit) => {
	let waiting = false
	return () => {
		if (!waiting) {
			callback()
			waiting = true
			setTimeout(() => {
				waiting = false
			}, limit)
		}
	}
}