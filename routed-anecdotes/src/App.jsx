import { useState, createContext } from 'react'
import Menu from '../components/menu'
import AnecdoteList from '../components/anecdote_list'
import About from '../components/about'
import Footer from '../components/footer'
import CreateNew from '../components/anecdote_form'
import anecdoteContext from '../anecdote_context'
import {
    BrowserRouter as Router,
    Routes, Route, Link
} from 'react-router-dom'

const App = () => {
	const [anecdotes, setAnecdotes] = useState([
		{
		content: 'If it hurts, do it more often',
		author: 'Jez Humble',
		info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
		votes: 0,
		id: 1
		},
		{
		content: 'Premature optimization is the root of all evil',
		author: 'Donald Knuth',
		info: 'http://wiki.c2.com/?PrematureOptimization',
		votes: 0,
		id: 2
		}
	])

	const [notification, setNotification] = useState('')

	const [content, setContent] = useState('')
	const [author, setAuthor] = useState('')
	const [info, setInfo] = useState('')

  	const addNew = (anecdote) => {
		anecdote.id = Math.round(Math.random() * 10000)
		setAnecdotes(anecdotes.concat(anecdote))
  	}

	const anecdoteById = (id) =>
		anecdotes.find(a => a.id === id)

	const vote = (id) => {
		const anecdote = anecdoteById(id)

		const voted = {
		...anecdote,
		votes: anecdote.votes + 1
		}

		setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
	}

  return (
    <div>
		<h1>Software anecdotes</h1>
		
		<Router>
			<Menu />
			<Routes>
				<Route path='/' element={<AnecdoteList anecdotes={anecdotes}/>} />
				<Route path='/create' element={
					<anecdoteContext.Provider value={[content, setContent, author, setAuthor, info, setInfo]}>
						<CreateNew addNew={addNew} />
					</anecdoteContext.Provider>
				} />
				<Route path='/about' element={<About />} />
			</Routes>
		</Router>
		<Footer />
    </div>
  )
}

export default App
