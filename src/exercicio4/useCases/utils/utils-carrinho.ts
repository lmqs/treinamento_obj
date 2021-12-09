import { ICarrinho } from "../../models/icarrinho-model";
import { IProduto } from "../../models/iproduto";

export class UtilsCarrinho {


  pesquisaPorProduto(produto: IProduto,carrinho: ICarrinho): boolean {
    for (const item of carrinho.itens) {
      if(item.produto.nome === produto.nome ) {
        return true
      }
    }
    return false
  }


}