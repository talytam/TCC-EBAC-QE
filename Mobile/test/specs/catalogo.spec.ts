import { browser, expect, $ } from '@wdio/globals';
import CatalogoPage from '../pageobjects/CatalogoPage.js';
import DetalhesProdutoPage from '../pageobjects/DetalhesProdutoPage.js';

describe('US-0004 — Catálogo de Produtos', () => {
    beforeEach(async () => {
        await browser.terminateApp('br.com.lojaebac');
        await browser.activateApp('br.com.lojaebac');
        await CatalogoPage.acessarCatalogo();
    });

    it('CT-021 — Deve exibir o catálogo com produtos disponíveis', async () => {
        await expect(CatalogoPage.titulo).toBeDisplayed();
        await expect(CatalogoPage.campoPesquisa).toBeDisplayed();

        await browser.waitUntil(
            async () => (await CatalogoPage.quantidadeProdutos()) > 0,
            {
                timeout: 15000,
                timeoutMsg: 'Nenhum produto encontrado no catálogo.'
            }
        );
    });

    it('CT-022 — Deve exibir os detalhes do produto selecionado', async () => {
        await browser.waitUntil(
            async () => (await CatalogoPage.quantidadeProdutos()) > 0,
            {
                timeout: 15000,
                timeoutMsg: 'Nenhum produto encontrado no catálogo.'
            }
        );

        const produtos = await CatalogoPage.produtos;
        await produtos[0].click();

        await expect(DetalhesProdutoPage.nomeProduto).toBeDisplayed();
        await expect(DetalhesProdutoPage.precoProduto).toBeDisplayed();
        await expect(DetalhesProdutoPage.descricaoProduto).toBeDisplayed();
        await expect(DetalhesProdutoPage.botaoAdicionarCarrinho).toBeDisplayed();
    });

    it('CT-023 — Deve pesquisar um produto existente', async () => {
        await CatalogoPage.pesquisarProduto('Camiseta EBAC');

        await browser.waitUntil(
            async () => (await CatalogoPage.quantidadeProdutos()) > 0,
            {
                timeout: 15000,
                timeoutMsg: 'Nenhum produto encontrado na pesquisa.'
            }
        );

        const produtos = await CatalogoPage.produtos;
        expect(produtos.length).toBeGreaterThan(0);

        for (const produto of produtos) {
            const descricao = await produto.getAttribute('content-desc');
            expect(descricao).toContain('Camiseta EBAC');
        }
    });

    it('CT-024 — Deve retornar lista vazia para produto inexistente', async () => {
        await CatalogoPage.pesquisarProduto('ProdutoInexistenteXYZ987');

        const mensagemSemProdutos = $(
            'android=new UiSelector().text("No products found")'
        );

        await expect(mensagemSemProdutos).toBeDisplayed();
        expect(await CatalogoPage.quantidadeProdutos()).toBe(0);
    });

    it.skip('CT-025 — Deve filtrar produtos por categoria', async () => {
        // BLOQUEADO — Limitações do ambiente de testes.
        // A listagem possui muitos registros duplicados, categorias sem produtos
        // e dificuldades de rolagem até na interação manual.
        // Não foi possível automatizar a seleção de categoria com massa estável.
    });
});
