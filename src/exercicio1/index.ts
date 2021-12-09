import { OperacoesRegras } from "./Operacoes/operacoes-regras"

export class Multiplos{
  private operacoesRegras = new OperacoesRegras()

  soma(valorLimite: number, descricao: string) : number{
    if(descricao !== 'e' && descricao !== 'ou' && descricao !== 'oue'){
      throw new Error('Parâmetro inválido')
    }
    const regra = this.operacoesRegras.encontreRegra(descricao)
    return regra?.somatorio(valorLimite) || 0
  }
  

}