const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
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
})