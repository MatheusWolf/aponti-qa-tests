# Módulo 12 — Testes automatizados com Playwright

> Módulo prático de automação de testes E2E com **Playwright** e **TypeScript**.

---

## 🎯 Objetivos do módulo

Ao final deste módulo, você será capaz de:

- Entender o que é Playwright e quando usá-lo
- Configurar um projeto de testes do zero com TypeScript
- Escrever testes E2E robustos e legíveis
- Aplicar o **Page Object Pattern** para organizar o código
- Usar assertions com auto-wait (sem `waitForTimeout` desnecessário)
- Rodar testes em modo headless, headed e UI
- Gerar e interpretar relatórios HTML

---

## 🧠 Conteúdos estudados

| Tópico | Descrição |
|--------|-----------|
| Introdução ao Playwright | O que é, diferenças para Selenium/Cypress |
| Setup do projeto | `npm init`, `@playwright/test`, `playwright install` |
| Locators | `page.locator`, seletores por texto, role, data-test |
| Ações | `click`, `fill`, `check`, `selectOption`, `hover` |
| Assertions | `expect` com auto-wait e retry |
| Page Object Model | Isolar seletores e ações em classes reutilizáveis |
| Hooks | `beforeEach`, `afterEach`, `beforeAll`, `afterAll` |
| Fixtures | `page`, `context`, `browser` e fixtures customizadas |
| Relatórios | HTML report, traces, screenshots on failure |
| Configuração | `playwright.config.ts`, `baseURL`, projetos, retries |

---

## 📝 Exercícios

| #  | Exercício | Descrição | Status |
|:--:|-----------|-----------|:------:|
| 01 | [Login básico](./exercicios/exercicio-01) | Testar login com sucesso, senha errada e usuário bloqueado |


**Legenda:** 🚧 em andamento 

---

## 📂 Estrutura do módulo
├── README.md ← este arquivo
└────modulo-12-playwright/
    ├── README.md 
    ├── package.json
    ├── tsconfig.json
    └── playwright.config.ts