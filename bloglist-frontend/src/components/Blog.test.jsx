import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
	const blog = {
		title: 'Test blog',
		author: "Test Author",
		url: "www.testblog.com",
		creator: {
			name: "Test User",
			username: "Tester",
			id: "1234567890"
		}
	}

	render(<Blog blog={blog} />)

	const elements = screen.getAllByText(/Test blog/)
	
	expect(elements).toBeDefined()
})

test('renders two elements per blog.', () => {
	const blog = {
		title: 'Test blog',
		author: "Test Author",
		url: "www.testblog.com",
		creator: {
			name: "Test User",
			username: "Tester",
			id: "1234567890"
		}
	}

	render(<Blog blog={blog} />)

	const elements = screen.getAllByText(/Test blog/)	
	expect(elements.length).to.equal(2)
})

test("expanded blog has style 'display: none' by default", () => {
	const blog = {
		title: 'Test blog',
		author: "Test Author",
		url: "www.testblog.com",
		creator: {
			name: "Test User",
			username: "Tester",
			id: "1234567890"
		}
	}

	render(<Blog blog={blog} />)

	const element = screen.getByTestId('expanded')
	expect(element).toHaveStyle('display: none')
})

test("expanded blog contains title, author, url and likes.", () => {
	const blog = {
		title: 'Test blog',
		author: "Test Author",
		url: "www.testblog.com",
		creator: {
			name: "Test User",
			username: "Tester",
			id: "1234567890"
		}
	}

	render(<Blog blog={blog} />)

	const element = screen.getByTestId('expanded')
	expect(element).toHaveTextContent('Test blog')
	expect(element).toHaveTextContent('Test Author')
	expect(element).toHaveTextContent('www.testblog.com')
	expect(element).toHaveTextContent('Likes:')
})

test("collapsed blog doesn't have style 'display: none' by default", () => {
	const blog = {
		title: 'Test blog',
		author: "Test Author",
		url: "www.testblog.com",
		creator: {
			name: "Test User",
			username: "Tester",
			id: "1234567890"
		}
	}

	render(<Blog blog={blog} />)

	const element = screen.getByTestId('collapsed')
	expect(element).not.toHaveStyle('display: none')
})

test("collapsed blog contains title and author.", () => {
	const blog = {
		title: 'Test blog',
		author: "Test Author",
		url: "www.testblog.com",
		creator: {
			name: "Test User",
			username: "Tester",
			id: "1234567890"
		}
	}

	render(<Blog blog={blog} />)

	const element = screen.getByTestId('collapsed')
	expect(element).toHaveTextContent('Test blog')
	expect(element).toHaveTextContent('Test Author')
})

test("collapsed blog does not contain url or likes.", () => {
	const blog = {
		title: 'Test blog',
		author: "Test Author",
		url: "www.testblog.com",
		creator: {
			name: "Test User",
			username: "Tester",
			id: "1234567890"
		}
	}

	render(<Blog blog={blog} />)

	const element = screen.getByTestId('collapsed')
	expect(element).not.toHaveTextContent('www.testblog.com')
	expect(element).not.toHaveTextContent('Likes:')
})