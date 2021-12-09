import { Validacoes } from "./utils/validacoes";

export class PalavrasEmNumero {

  private readonly validacoes: Validacoes

  constructor(validacoes: Validacoes){
    this.validacoes = validacoes
  }

  transformeLetrasEmNumero(letras: any) : number {
    let alfabeto = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let soma = 0
    for (var i in letras) {
      soma += (alfabeto.indexOf(letras[i]) + 1);
  }
    return soma
  }

  verificaFeliz(valor: number): boolean {
    return this.validacoes.verificaFeliz(valor)
  }

  verificaMultiplo3Ou5(valor: number): boolean {
    return this.validacoes.verificaMultiplo3Ou5(valor)
}

  verificaPrimo(valor: number): boolean{
    return this.validacoes.verificaPrimo(valor)
  }

}
