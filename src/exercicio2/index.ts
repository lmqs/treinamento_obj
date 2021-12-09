import { Utilitarios } from "./utils/utils"


export class NumerosFelizes {

  private readonly utilitarios: Utilitarios

  constructor(utilitarios: Utilitarios){
    this.utilitarios = utilitarios
  }

  EFeliz(numero: number) : boolean {
    if(numero <= 0){
      throw new Error('Parâmetro inválido')
    }
    if(this.utilitarios.eDecimal(numero)){
      throw new Error('Parâmetro inválido')
    }
    let numerosArray = [numero]
    while (numero !==  1){
      numero = this.utilitarios.somaDosQuadrados(numero)
      const repetido  = this.utilitarios.containArray(numero, numerosArray)
      if(repetido) return false
      numerosArray.push(numero)
    }
    return true
  }
}
