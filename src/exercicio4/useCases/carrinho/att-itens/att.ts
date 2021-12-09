import { IItensCarrinho } from "../../../models/iitens-carrinho";
import { IAttItemModel } from "../../models/icrud-item-model";

export class AttItem {

  atualizaQuantidadeProduto(attModel: IAttItemModel): IItensCarrinho[]{
    const { produto, quantidade, carrinho, descricao } = attModel
    if(carrinho.itens){
      carrinho.itens.filter(function(item) {
        if(item.produto.nome === produto.nome ) {
          if(descricao === 'a'){
            item.quantidade += quantidade
          }else{
            item.quantidade -= quantidade
          }
        }
      });
    }
    return carrinho.itens
  }
  
}

