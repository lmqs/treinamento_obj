import { IOperacoes } from "./ioperacoes";
import { SomaE } from "./somaE";
import { SomaOu } from "./somaOu";
import { SomaOuE } from "./somaOuE";


export class OperacoesRegras {
  private _regras: IOperacoes[]

  constructor(){
    this._regras = [
      new SomaE(),
      new SomaOu(),
      new SomaOuE()
    ]
  }

  encontreRegra(descricao: string): IOperacoes | undefined {
    return this._regras.find((regra) => regra.validar(descricao))
  }
}