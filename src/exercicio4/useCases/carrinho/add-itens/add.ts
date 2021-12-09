import { ICarrinho } from "../../../models/icarrinho-model"
import { IItensCarrinho } from "../../../models/iitens-carrinho"
import { IUsuario } from "../../../models/iusuario"
import { IAddItemModel } from "../../models/icrud-item-model"
import { UtilsCarrinho } from "../../utils/utils-carrinho"
import { AttItem } from "../att-itens/att"


export class AddItem {

  private readonly utils: UtilsCarrinho
  private readonly atualiza: AttItem

  constructor(utils:UtilsCarrinho, atualiza: AttItem){
    this.utils = utils
    this.atualiza = atualiza
  }
  
  addItens(addModel: IAddItemModel): ICarrinho{
    const {itens, usuario, carrinho} =  addModel

    if(carrinho){
      for (const item of itens) {
        if(this.utils.pesquisaPorProduto(item.produto,carrinho)){
          this.atualiza.atualizaQuantidadeProduto({
              produto: item.produto, 
              quantidade: item.quantidade, 
              carrinho,
              descricao: 'a'
            })
        }else{
          carrinho.itens.push(item)
        }
      }
      return carrinho
    }
    const novoCarrinho = { usuario, itens }
    return novoCarrinho
  }
}
 