
import { test, expect } from '@playwright/test';
import { CatalogoPage } from '../pages/CatalogoPage';

test.describe('US-0004 - Catálogo de produtos', () => {

  test('CT-021 - Consultar catálogo de produtos', async ({ page }) => {
    const catalogo = new CatalogoPage(page);

    await catalogo.acessarLoja();
    await catalogo.acessarCatalogo();

    await expect(page).toHaveURL(/\/produtos\/?/);

    await expect(
      page.getByRole('main').getByRole('heading', {
        name: 'Produtos',
        exact: true
      })
    ).toBeVisible();

    // Confirma que existe ao menos um produto na listagem
    await expect(
      page.getByRole('main')
        .locator('h3')
        .getByRole('link', {
          name: /.+/,
        })
        .first()
    ).toBeVisible();
  });

  test('CT-022 - Abrir detalhes de um produto', async ({ page }) => {
    const catalogo = new CatalogoPage(page);

    await catalogo.acessarLoja();
    await catalogo.pesquisarProduto('Torque Power Short');

    await expect(page).toHaveURL(/\/product\/torque-power-short\/?/i);

    await expect(
      catalogo.tituloProduto('Torque Power Short')
    ).toBeVisible();

    await expect(
      page.getByRole('spinbutton', { name: 'Qty' })
    ).toBeVisible();
  });

  test('CT-023 - Pesquisar produto existente', async ({ page }) => {
    const catalogo = new CatalogoPage(page);

    await catalogo.acessarLoja();
    await catalogo.pesquisarProduto('Torque Power Short');

    await expect(
      catalogo.tituloProduto('Torque Power Short')
    ).toBeVisible();
  });

  test('CT-024 - Pesquisar produto inexistente', async ({ page }) => {
    const catalogo = new CatalogoPage(page);

    await catalogo.acessarLoja();
    await catalogo.pesquisarProduto('produto-inexistente-987654');

    await expect(
      page.getByText(
        'Nenhum produto foi encontrado para a sua seleção.',
        { exact: false }
      )
    ).toBeVisible();
  });

  test('CT-025 - Pesquisar produtos por categoria', async ({ page }) => {
    const catalogo = new CatalogoPage(page);

    await catalogo.acessarLoja();
    await catalogo.pesquisarPorCategoria('Shorts');

    await expect(
      page.getByText('Torque Power Short', { exact: true })
        .filter({ visible: true })
        .first()
    ).toBeVisible();
  });

});
