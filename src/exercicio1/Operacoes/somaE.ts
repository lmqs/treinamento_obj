import { IOperacoes } from "./ioperacoes";

export class SomaE implements IOperacoes{

  somatorio(valorLimite: number ) : number{
    if(valorLimite <= 0){
      throw new Error('Parâmetro inválido')
    }
    let soma = 0
    for (let indice = 3; indice <= valorLimite; indice++) {
      if((indice % 3 === 0) && (indice % 5 === 0)) soma = soma + indice 
    }
    return soma
  }

  validar(descricao: string): boolean {
    return (descricao === 'e' )
  }

  
}