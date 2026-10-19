
import { Page, Locator } from '@playwright/test';

export class CatalogoPage {
  readonly page: Page;
  readonly campoPesquisa: Locator;
  readonly botaoPesquisa: Locator;
  readonly seletorCategoria: Locator;
  readonly menuComprar: Locator;

  constructor(page: Page) {
    this.page = page;

    this.campoPesquisa = page.getByRole('textbox', {
      name: 'Enter your search'
    });

    this.botaoPesquisa = page.getByRole('button', {
      name: /Search/
    });

    this.seletorCategoria = page.getByRole('combobox');

    this.menuComprar = page
      .getByRole('navigation')
      .getByRole('link', { name: /Comprar/ });
  }

  async acessarLoja(): Promise<void> {
    await this.page.goto('/');
  }

  async abrirPesquisa(): Promise<void> {
    await this.page
      .locator('[id^="search-form-modal-"]')
      .getByRole('button')
      .click();
  }

  async pesquisarProduto(nome: string): Promise<void> {
    await this.abrirPesquisa();
    await this.campoPesquisa.fill(nome);
    await this.botaoPesquisa.click();
  }

  async pesquisarPorCategoria(categoria: string): Promise<void> {
    await this.abrirPesquisa();
    await this.seletorCategoria.selectOption({
      label: categoria
    });
    await this.botaoPesquisa.click();
  }

  async acessarCatalogo(): Promise<void> {
    await this.menuComprar.click();
  }

  tituloProduto(nome: string): Locator {
    return this.page.getByRole('heading', {
      name: nome,
      exact: true
    });
  }
}
