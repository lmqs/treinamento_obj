import { ICarrinho } from "../../../models/icarrinho-model"
import { IProduto } from "../../../models/iproduto"
import { IDeleteItemModel } from "../../models/icrud-item-model"
import { UtilsCarrinho } from "../../utils/utils-carrinho"
import { AttItem } from "../att-itens/att"

export class RemoveItem {

  private readonly utils: UtilsCarrinho
  private readonly atualiza: AttItem

  constructor(utils:UtilsCarrinho, atualiza: AttItem){
    this.utils = utils
    this.atualiza = atualiza
  }
  
    
  removerItem(deleteItemModel: IDeleteItemModel): ICarrinho{
    const {produto, carrinho, quantidade} =  deleteItemModel

    if(this.utils.pesquisaPorProduto(produto,carrinho)){
      this.atualiza.atualizaQuantidadeProduto({
        produto, quantidade, carrinho, descricao: 'r'
      })

    }
    this.removeItensComQuantidadeZerada(carrinho)
    return carrinho
  }


  removeItensComQuantidadeZerada(carrinho: ICarrinho){
    carrinho.itens.filter(function(item) {
      if(item.quantidade <= 0 ) {
        const indice = carrinho.itens.indexOf(item)
        carrinho.itens.splice(indice, 1)
      }
    });
  }
   
}
 