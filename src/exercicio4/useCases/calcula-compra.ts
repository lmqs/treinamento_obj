import { ICarrinho } from "../models/icarrinho-model";
import { IFrete } from "../protocolos/ifrete";
import { Carrinho } from "./carrinho/carrinho";

export class CalculaCompra {

  private readonly correios: IFrete
  private readonly carrinho: Carrinho

  constructor(correios: IFrete, carrinho: Carrinho){
    this.correios = correios
    this.carrinho = carrinho
  }

  soma(carrinho: ICarrinho): number{

    const {usuario} = carrinho
    if(usuario.cep === '' || usuario.nome === '') {
      throw new Error('Campo obrigatório')
    }
    let soma = this.carrinho.valorTotalCompras(carrinho)
    
    if(soma < 100){
      soma += this.correios.pesquisaPorCEP(usuario.cep)
    }

    return soma
  }

}