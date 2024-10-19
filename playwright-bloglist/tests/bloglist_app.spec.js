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
        const login_button = await page.getByRole('button', {name: 'login'})
        await expect(login_button).toBeVisible()
    })
    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.locator('input[name="Username"]').fill('test')
            await page.locator('input[name="Password"]').fill('pass')
            await page.getByRole('button', {name: 'login'}).click()
            await expect(page.getByText('Test User logged-in')).toBeVisible()
        })
    
        test('fails with wrong credentials', async ({ page }) => {
            await page.locator('input[name="Username"]').fill('test')
            await page.locator('input[name="Password"]').fill('incorrect')
            await page.getByRole('button', {name: 'login'}).click()
            await expect(page.getByText('Test User logged-in')).not.toBeVisible()
        })
    })
})