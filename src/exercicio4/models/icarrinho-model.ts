import { IItensCarrinho } from "./iitens-carrinho"
import { IUsuario } from "./iusuario"


export interface ICarrinho{
  usuario: IUsuario
  itens: IItensCarrinho[]

}
