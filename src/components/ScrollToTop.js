import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'

const ScrollToTopOnPageChange = ({ history }) => {
	useEffect(() => {
		const unlisten = history.listen(() => {
			window.scrollTo(0, 0)
		})
		return () => {
			unlisten()
		}
	}, [])

	return (null)
}

export default withRouter(ScrollToTopOnPageChange)