import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { expect } from 'vitest'

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

test("renders 'create new' header for the form.", () => {
	render(<BlogForm />)
	const element = screen.getByText('create new')
	expect(element).toBeDefined()
    expect(element.nodeName.toLowerCase()).toBe('h1')
})

test('renders a form.', () => {
	const { container } = render(<BlogForm />)
	const form = container.querySelector('form')
	expect(form).toBeDefined()
    expect(form.nodeName.toLowerCase()).toBe('form')
})

test('renders form input for title.', () => {
	render(<BlogForm />)
	const element = screen.getByText('title')
	expect(element).toBeDefined()
    expect(element.querySelector('input')).toBeDefined()
    expect(element.querySelector('input').nodeName.toLowerCase()).toBe('input')
})

test('renders form input for author.', () => {
	render(<BlogForm />)
	const element = screen.getByText('author')
	expect(element).toBeDefined()
    expect(element.querySelector('input')).toBeDefined()
    expect(element.querySelector('input').nodeName.toLowerCase()).toBe('input')
})

test('renders form input for url.', () => {
	render(<BlogForm />)
	const element = screen.getByText('url')
	expect(element).toBeDefined()
    expect(element.querySelector('input')).toBeDefined()
    expect(element.querySelector('input').nodeName.toLowerCase()).toBe('input')
})

test("renders a 'create' button to submit the form.", () => {
	render(<BlogForm />)
	const button = screen.getByText('create')
	expect(button).toBeDefined()
    expect(button.nodeName.toLowerCase()).toBe('button')
})

test("pressing 'create' button calls create event handler.", async () => {
    const mockHandler = vi.fn()
	render(<BlogForm createBlog={mockHandler}/>)
    const user = userEvent.setup()
	const button = screen.getByText('create')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
})

test("correct details are passed to the event handler upon pressing create button.", async () => {
    const mockHandler = vi.fn()
	render(<BlogForm createBlog={mockHandler}/>)
    const user = userEvent.setup()

	const button = screen.getByText('create')
    const title_input = screen.getByText('title').querySelector('input')
    const author_input = screen.getByText('author').querySelector('input')
    const url_input = screen.getByText('url').querySelector('input')

    await user.type(title_input, 'test title')
    await user.type(author_input, 'test author')
    await user.type(url_input, 'test url')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('test title')
    expect(mockHandler.mock.calls[0][0].author).toBe('test author')
    expect(mockHandler.mock.calls[0][0].url).toBe('test url')
})