import { ICarrinho } from "../../models/icarrinho-model"
import { IItensCarrinho } from "../../models/iitens-carrinho"
import { IProduto } from "../../models/iproduto"
import { IUsuario } from "../../models/iusuario"
import { IAddItemModel, IDeleteItemModel } from "../models/icrud-item-model"
import { UtilsCarrinho } from "../utils/utils-carrinho"
import { AddItem } from "./add-itens/add"
import { RemoveItem } from "./remove-itens/remove"

export class Carrinho {

  private readonly add: AddItem
  private readonly remove: RemoveItem


  constructor(add: AddItem, remove: RemoveItem){
    this.add = add
    this.remove = remove
  }
  
  addItens(addModel: IAddItemModel): number{
    const {itens, usuario, carrinho} =  addModel
    const carrinhoAdd = this.add.addItens({itens, usuario, carrinho})    
    return this.valorTotalCompras(carrinhoAdd)
  }

  removerItem(deleteItemModel: IDeleteItemModel) {
    this.remove.removerItem(deleteItemModel)
  }

  valorTotalCompras(carrinho: ICarrinho): number{
    let soma = 0
    for (const produtoObj of carrinho.itens) {
      soma += (produtoObj.produto.valor * produtoObj.quantidade )
    }
    return soma
  }
}
