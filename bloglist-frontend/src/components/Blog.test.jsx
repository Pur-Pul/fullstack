import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const test_blog = {
	title: 'Test blog',
	author: "Test Author",
	url: "www.testblog.com",
	likes: 10,
	creator: {
		name: "Test User",
		username: "Tester",
		id: "1234567890"
	}
}


test('renders content', () => {
	render(<Blog blog={test_blog} />)
	const elements = screen.getAllByText(/Test blog/)
	expect(elements).toBeDefined()
})

test('renders two elements per blog.', () => {
	render(<Blog blog={test_blog} />)
	const elements = screen.getAllByText(/Test blog/)	
	expect(elements.length).to.equal(2)
})

test("expanded blog has style 'display: none' by default", () => {
	render(<Blog blog={test_blog} />)
	const element = screen.getByTestId('expanded')
	expect(element).toHaveStyle('display: none')
})

test("collapsed blog doesn't have style 'display: none' by default", () => {
	render(<Blog blog={test_blog} />)
	const element = screen.getByTestId('collapsed')
	expect(element).not.toHaveStyle('display: none')
})

test("collapsed blog contains title and author.", () => {
	render(<Blog blog={test_blog} />)
	const element = screen.getByTestId('collapsed')
	expect(element).toHaveTextContent('Test blog')
	expect(element).toHaveTextContent('Test Author')
})

test("collapsed blog does not contain url or likes.", () => {
	render(<Blog blog={test_blog} />)
	const element = screen.getByTestId('collapsed')
	expect(element).not.toHaveTextContent('www.testblog.com')
	expect(element).not.toHaveTextContent('Likes:')
})

test("blog has a 'view' button.", async () => {
	render(<Blog blog={test_blog} />)
	const button = screen.getByText('view')
	expect(button).toBeDefined()
})

test("expanded blog does not have style 'display: none' after clicking the 'view' button.", async () => {
	render(<Blog blog={test_blog} />)
	const user = userEvent.setup()
	const button = screen.getByText('view')
	await user.click(button)
	const element = screen.getByTestId('expanded')
	expect(element).not.toHaveStyle('display: none')
})

test("collapsed blog has style 'display: none' after clicking the 'view' button.", async () => {
	render(<Blog blog={test_blog} />)
	const user = userEvent.setup()
	const button = screen.getByText('view')
	await user.click(button)
	const element = screen.getByTestId('collapsed')
	expect(element).toHaveStyle('display: none')
})

test("expanded blog contains title, author, url and likes after clicking the 'view' button.", async () => {
	render(<Blog blog={test_blog} />)
	const user = userEvent.setup()
	const button = screen.getByText('view')
	await user.click(button)

	const element = screen.getByTestId('expanded')
	expect(element).toHaveTextContent('Test blog')
	expect(element).toHaveTextContent('Test Author')
	expect(element).toHaveTextContent('www.testblog.com')
	expect(element).toHaveTextContent('Likes: 10')
})