import { useSelector, useDispatch } from 'react-redux'

const App = () => {
    const dispatch = useDispatch()

	const good = () => {
		dispatch({
			type: 'GOOD'
		})
	}

	const ok = () => {
		dispatch({
			type: 'OK'
		})
	}

	const bad = () => {
		dispatch({
			type: 'BAD'
		})
	}

	const reset = () => {
		dispatch({
			type: 'ZERO'
		})
	}
	//const state = useSelector(state => state)
	const goodFeedback = useSelector(state => state.good)
	const okFeedback = useSelector(state => state.ok)
	const badFeedback = useSelector(state => state.bad)

	return (
		<div>
		<button onClick={good}>good</button> 
		<button onClick={ok}>ok</button> 
		<button onClick={bad}>bad</button>
		<button onClick={reset}>reset stats</button>
		<div>good {goodFeedback}</div>
		<div>ok {okFeedback}</div>
		<div>bad {badFeedback}</div>
		</div>
	)
}

export default App