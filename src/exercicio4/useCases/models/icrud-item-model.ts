import { ICarrinho } from "../../models/icarrinho-model";
import { IItensCarrinho } from "../../models/iitens-carrinho";
import { IProduto } from "../../models/iproduto";
import { IUsuario } from "../../models/iusuario";


export interface IAddItemModel {
  itens: IItensCarrinho[]
  usuario: IUsuario 
  carrinho?: ICarrinho
}


export interface IAttItemModel {
  produto: IProduto
  quantidade:number
  carrinho: ICarrinho
  descricao: string
}

export interface IDeleteItemModel {
  produto: IProduto
  carrinho: ICarrinho
  quantidade: number
}