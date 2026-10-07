import { test, expect, Page } from '@playwright/test';


// Dados dos produtos
const produtos = [
  {
    nome: 'Sauce Labs Backpack',
    url_id: /id=4/,
    preco: '29.99',
  },
  {
    nome: 'Sauce Labs Bike Light',
    url_id: /id=0/,
    preco: '9.99',
  },
  {
    nome: 'Sauce Labs Bolt T-Shirt',
    url_id: /id=1/,
    preco: '15.99',
  },
];

//## Funções Auxiliares

// Função para fazer login
async function fazerLogin(page: Page, usuario: string, senha: string, usuarioValido: boolean = true) {
    // Acessa a página de login, preenche os campos e clica no botão de login
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill(usuario);
    await page.getByPlaceholder('Password').fill(senha);
    await page.getByRole('button', { name: 'Login' }).click();
    // Se o teste espera por um usuário válido
    // A sequencia é entrar na que a página de inventário seja carregada
    if (usuarioValido) {
        await expect(page).toHaveURL(/inventory\.html/);
    }
}
// Função para acessar a página de detalhes do produto 
// RegExp para validar a URL por conta dos caracteres especiais
async function acessarProduto(page: Page, produtoNome: string, produtoUrlId: RegExp) {
    // Valida que estamos na página de inventário
    await expect(page).toHaveURL(/inventory\.html/);
    // Localiza o card do produto pelo nome e clica nele    
    const card = page.locator('.inventory_item_name', {hasText: produtoNome});
    await card.click();
    await expect(page).toHaveURL(produtoUrlId);
}
// Adiciona um produto ao carrinho a partir da página de inventário
async function adicionarProdutoDoInventario(page: Page, produto: string) {
  await expect(page).toHaveURL(/inventory\.html/);
    // Localiza o card do produto pelo nome e clica no botão "Add to cart"
  const card = page.locator('.inventory_item', { hasText: produto });
  await card.getByRole('button', { name: 'Add to cart' }).click();
}
// Acessa a página do carrinho
async function acessarCarrinho(page: Page) {
  await page.locator('.shopping_cart_link').click();
  await expect(page).toHaveURL(/cart\.html/);
}

//## Area de Testes

// Testes de Login
test.describe('Login', () => {
  test('login com credenciais válidas', async ({ page }) => {
    await fazerLogin(page, 'standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('login inválido - senha errada', async ({ page }) => {
    await fazerLogin(page, 'standard_user', 'senha_errada', false);
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Username and password do not match'
    );
  });
});


// Testes de Produto
test.describe('Produto', () => {
  test.beforeEach(async ({ page }) => {
    // Faz login antes de cada teste, espera como resultado que a página de inventário seja carregada
    await fazerLogin(page, 'standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('Acessar página do produto', async ({ page }) => {
    // Entra na página de detalhes do produto
    await acessarProduto(page, produtos[0].nome, produtos[0].url_id);
  });

  test('Adicionar produto ao carrinho e remover', async ({ page }) => {
    // Entra na página de detalhes do produto
    await acessarProduto(page, produtos[1].nome, produtos[1].url_id);

    // Adiciona
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();

    // Remove item do carrinho
    await page.getByRole('button', { name: 'Remove' }).click();
    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();
  });
});


// Testes de Carrinho
test.describe('Carrinho', () => {
  test.beforeEach(async ({ page }) => {
    await fazerLogin(page, 'standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('Adicionar produto ao carrinho pelo inventário', async ({ page }) => {
    // Adiciona produto pelo inventário
    await adicionarProdutoDoInventario(page, produtos[2].nome);

    // Abre o carrinho
    await acessarCarrinho(page);

    // Valida que o item está lá
    const itemNoCarrinho = page.locator('.cart_item', {hasText: produtos[2].nome,});
    await expect(itemNoCarrinho).toBeVisible();

    // Valida que é o único item
    await expect(page.locator('.cart_item')).toHaveCount(1);
  });

  test('Checar preço do produto no carrinho', async ({ page }) => {
    // Adiciona no inventário
    await adicionarProdutoDoInventario(page, produtos[0].nome);

    // Abre o carrinho
    await acessarCarrinho(page);

    // Valida o preço dentro do item correto (escopado)
    const itemNoCarrinho = page.locator('.cart_item', {hasText: produtos[0].nome,});
    await expect(itemNoCarrinho.locator('.inventory_item_price')).toHaveText(`$${produtos[0].preco}`);
  });
});