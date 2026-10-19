import { $, $$ } from '@wdio/globals';

class CatalogoPage {
    get titulo() {
        return $('//android.widget.TextView[@text="Browse" and not(parent::android.view.View)]');
    }

    get campoPesquisa() {
        return $('//*[@resource-id="searchInput"]');
    }

    get filtroCategoria() {
        return $('//*[@resource-id="Category"]');
    }

    get ordenarPor() {
        return $('//*[@resource-id="SortBy"]');
    }

    get produtos() {
        return $$('//*[@resource-id="productDetails"]');
    }

    get buscaHome() {
        return $('//*[@resource-id="search-products"]');
    }

    get abaBrowse() {
        return $('//*[@resource-id="tab-Search"]/..');
    }

    async acessarCatalogo() {
        await this.buscaHome.waitForDisplayed({ timeout: 60000 });
        await this.abaBrowse.click();
        await this.campoPesquisa.waitForDisplayed({ timeout: 30000 });
    }

    async pesquisarProduto(nome: string) {
        await this.campoPesquisa.setValue(nome);
    }

    async quantidadeProdutos() {
        return (await this.produtos).length;
    }
}

export default new CatalogoPage();
