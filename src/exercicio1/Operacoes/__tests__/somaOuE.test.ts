import { IOperacoes } from "../ioperacoes";
import { SomaOuE } from "../somaOuE";

const makeSut = (): IOperacoes => {
  return new SomaOuE()
}

describe('Teste da class SomaE', () => {
  test('Deverá retornar a soma de todos os números múltiplos de (3 OU 5) e 7 de números naturais abaixo de 1000', () => {
    const sut = new SomaOuE()
    const result = sut.somatorio(100)
    expect(result).toEqual(315)
  })

  test('Deverá retornar TRUE ao executar o método validacao passando no parametro o valor oue', () => {
    const sut = makeSut()
    const resultado = sut.validar('oue')
    expect(resultado).toEqual(true)
  })

  test('Deverá retornar erro caso o parâmetro seja menor que 0', () => {
    const sut = makeSut()
    expect(()=> {sut.somatorio(0)}).toThrow('Parâmetro inválido')
  })
  
  test('Deverá retornar FALSE ao executar o método validar passando no parametro o valor diferente de oue', () => {
    const sut = makeSut()
    const resultado = sut.validar('b')
    expect(resultado).toEqual(false)
  })


  test('Deverá garantir que a função somatório vai ser chamado com o parâmetro correto', () => {
    const sut = makeSut()
    const resultSpy = jest.spyOn(sut, 'somatorio')
    sut.somatorio(20)
    expect(resultSpy).toHaveBeenCalledWith(20)
 })
});