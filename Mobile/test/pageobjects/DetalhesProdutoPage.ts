import { $ } from '@wdio/globals';

class DetalhesProdutoPage {
    get nomeProduto() {
        return $('android=new UiSelector().text("Camiseta EBAC")');
    }

    get precoProduto() {
        return $('android=new UiSelector().text("R$ 149.99")');
    }

    get descricaoProduto() {
        return $('android=new UiSelector().text("Camiseta 100% algodão")');
    }

    get botaoAdicionarCarrinho() {
        return $('android=new UiSelector().resourceId("addToCart")');
    }

    get botaoVoltar() {
        return $('android=new UiSelector().resourceId("back")');
    }
}

export default new DetalhesProdutoPage();
