import {test, expect} from '@playwright/test';


test('login com credenciais válidas', async ({page}) => {
    // Credenciais válidas para login com usuário e senha padrão
    const username = 'standard_user';
    const password = 'secret_sauce';
    // .goto = ir para página 'https'
    await page.goto('https://www.saucedemo.com/');
    // .getByPlaceholder = pegar pelo placeholder (elemento que tem um texto dentro)
    await page.getByPlaceholder('Username').fill(username);
    // .fill = preencher o campo com o valor informado
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', {name: 'Login'}).click();
    await expect(page).toHaveTitle(/Swag Labs/)
});