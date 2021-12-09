
export class Utilitarios {

  containArray(valor: number, numerosArray: number[]): boolean{
    return numerosArray.indexOf(valor) >=0
  }

  somaDosQuadrados(valor: number): number{
    let soma = 0
    for (let indice = 0; indice < valor.toString().length; indice++) {
      soma += Math.pow(parseInt(valor.toString()[indice]),2)
    }
    return soma
  }
  
  eDecimal(valor: number) : boolean {
    return valor % 1 !== 0
  }
}
