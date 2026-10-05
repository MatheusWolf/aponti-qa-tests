import {test, expect} from '@playwright/test';

test.describe('Login saucedemo / Swag Labs', () => {
// Credenciais válidas para login com usuário e senha padrão
    const username_valid = 'standard_user';
    const password_valid = 'secret_sauce';
    const cenariosValidos = [
        {
        nome: 'Usuário padrão',
        usuario: 'standard_user',
        senha: 'secret_sauce',
        },
        {
        nome: 'Usuário visual',
        usuario: 'visual_user',
        senha: 'secret_sauce',
        }
    ];
    const cenariosInvalidos = [
        {
        nome: 'Usuário inválido',
        usuario: 'invalid_user',
        senha: 'secret_sauce',
        mensagemDeErro: 'Username and password do not match',
        },
        {
        nome: 'Senha inválida',
        usuario: 'standard_user',
        senha: 'invalid_password',
        mensagemDeErro: 'Username and password do not match',
        },
        {
        nome: 'Usuário e senha inválidos',
        usuario: 'invalid_user',
        senha: 'invalid_password',
        mensagemDeErro: 'Username and password do not match',
        },
        {
        nome: 'Usuário em branco',
        usuario: '',
        senha: 'secret_sauce',
        mensagemDeErro: 'Username is required',
        },
        {
        nome: 'Senha em branco',
        usuario: 'standard_user',
        senha: '',
        mensagemDeErro: 'Password is required',
        },
        {
        nome: 'Usuário e senha em branco',
        usuario: '',
        senha: '',
        mensagemDeErro: 'Username is required',
        },
    ];  

    // beforeEach = É um hook (gancho) para executar antes de cada teste indivudual
    // nesse caso acessar a pagina de login do site
    test.beforeEach(async ({page}) => { 
        // page é o parametro que representa a página que será acessada
    await page.goto('https://www.saucedemo.com/');
    });

    for (const cenario of cenariosValidos) {
        test(`Login Válido - ${cenario.nome}`, async ({page}) => {
            // .getByPlaceholder = pegar pelo placeholder (elemento que tem um texto dentro) 'Username' e 'Password'
            // cenario.usuario = pega o usuário do cenario.usuario por quantidade de cenários válidos, o mesmo para senha
            await page.getByPlaceholder('Username').fill(cenario.usuario); 
            await page.getByPlaceholder('Password').fill(cenario.senha);
            // Busca um botão pelo seu papel (role) e nome (name) e .clica executa a ação de clicar no botão
            await page.getByRole('button', {name: 'Login'}).click();
            // Verifica se a URL atual da página contém o texto 'inventory.html' (página de inventário)
            await expect(page).toHaveURL(/inventory\.html/);
        });
    }


    for (const cenario of cenariosInvalidos) {
        test(`Login Inválido - ${cenario.nome}`, async ({ page }) => {
            await page.getByPlaceholder('Username').fill(cenario.usuario);
            await page.getByPlaceholder('Password').fill(cenario.senha);
            await page.getByRole('button', { name: 'Login' }).click();
            // .toContainText = Verifica se o elemento contém o texto esperado (mensagem de erro)
            await expect(page.locator('[data-test="error"]'))
                .toContainText(cenario.mensagemDeErro);
        });
    }
});