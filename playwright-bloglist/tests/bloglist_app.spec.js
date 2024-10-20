const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Test User',
                username: 'test',
                password: 'pass'
            }
        })

        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {

        const locator = await page.getByText('login to application')
        await expect(locator).toBeVisible()
        const username_field = await page.locator('input[name="Username"]')
        await expect(username_field).toBeVisible()
        const password_field = await page.locator('input[name="Password"]')
        await expect(password_field).toBeVisible()
        const login_button = await page.getByRole('button', { name: 'login' })
        await expect(login_button).toBeVisible()
    })
    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.locator('input[name="Username"]').fill('test')
            await page.locator('input[name="Password"]').fill('pass')
            await page.getByRole('button', { name: 'login' }).click()
            await expect(page.getByText('Test User logged-in')).toBeVisible()
        })
    
        test('fails with wrong credentials', async ({ page }) => {
            await page.locator('input[name="Username"]').fill('test')
            await page.locator('input[name="Password"]').fill('incorrect')
            await page.getByRole('button', { name: 'login' }).click()
            await expect(page.getByText('Test User logged-in')).not.toBeVisible()
        })
    })
    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.locator('input[name="Username"]').fill('test')
            await page.locator('input[name="Password"]').fill('pass')
            await page.getByRole('button', { name: 'login' }).click()
        })
        
        test('new blog button is visible.', async ({ page }) => {
            const button = await page.getByRole('button', { name: 'new blog' })
            await expect(button).toBeVisible()
        })

        test('blog form is not visible by default.', async ({ page }) => {
            const locator = await page.getByText('create new')
            await expect(locator).not.toBeVisible()
            const title_field = await page.locator('input[name="title"]')
            await expect(title_field).not.toBeVisible()
            const author_field = await page.locator('input[name="author"]')
            await expect(author_field).not.toBeVisible()
            const url_field = await page.locator('input[name="url"]')
            await expect(url_field).not.toBeVisible()
            const create_button = await page.getByRole('button', { name: 'create' })
            await expect(create_button).not.toBeVisible()
        })

        test('blog form is visible after pressing the new blog button.', async ({ page }) => {
            await page.getByRole('button', { name: 'new blog' }).click()
            const locator = await page.getByText('create new')
            await expect(locator).toBeVisible()
            const title_field = await page.locator('input[name="title"]')
            await expect(title_field).toBeVisible()
            const author_field = await page.locator('input[name="author"]')
            await expect(author_field).toBeVisible()
            const url_field = await page.locator('input[name="url"]')
            await expect(url_field).toBeVisible()
            const create_button = await page.getByRole('button', { name: 'create' })
            await expect(create_button).toBeVisible()
        })

        test('div containing blogs is visible.', async ({ page }) => {
            const blogs_div = await page.locator('.blogs')
            await expect(blogs_div).toBeVisible()
        })


        test('new blog appers in blog div after successful creation.', async ({ page }) => {
            await page.getByRole('button', { name: 'new blog' }).click()
            await page.locator('input[name="title"]').fill('a new blog')
            await page.locator('input[name="author"]').fill('new author')
            await page.locator('input[name="url"]').fill('new url')
            page.getByRole('button', { name: 'create' }).click()
            
            const blogs_div = await page
                .locator('.blogs')
                .filter({ has: page.locator('.blog') })
                .filter({ hasText: 'a new blog' })
                
            await expect(blogs_div).toBeVisible()
        })
      })
})