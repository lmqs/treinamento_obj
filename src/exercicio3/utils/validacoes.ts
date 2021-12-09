import { Multiplos } from "../../exercicio1"
import { NumerosFelizes } from "../../exercicio2"
import { Utilitarios } from "../../exercicio2/utils/utils"

export class Validacoes {

  verificaFeliz(valor: number): boolean {
    const numeroFeliz = new NumerosFelizes(new Utilitarios())
    return numeroFeliz.EFeliz(valor)
  }

  verificaMultiplo3Ou5(valor: number): boolean {
    const multiplos = new Multiplos()
    const resultado = multiplos.soma(valor, 'ou')
    return resultado > 0
  }

  verificaPrimo(valor: number): boolean{
    for (let i = 2; i < valor; i++)
      if (valor % i === 0) {
        return false;
      }
    return valor > 1
  }

}
