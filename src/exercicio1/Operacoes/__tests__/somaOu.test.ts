import { IOperacoes } from "../ioperacoes";
import { SomaOu } from "../somaOu";

const makeSut = (): IOperacoes => {
  return new SomaOu()
}


describe('Teste da class SomaOu', () => {
  test('Deverá retornar a soma de todos os números múltiplos de 3 OU 5 de números naturais abaixo de 1000', () => {
    const sut = makeSut()
    const result = sut.somatorio(10)
    expect(result).toEqual(33)
  })

  test('Deverá retornar erro caso o parâmetro seja menor que 0', () => {
    const sut = makeSut()
    expect(()=> {sut.somatorio(0)}).toThrow('Parâmetro inválido')
  })
  
  test('Deverá retornar TRUE ao executar o método validacao passando no parametro o valor ou', () => {
    const sut = makeSut()
    const resultado = sut.validar('ou')
    expect(resultado).toEqual(true)
  })

  test('Deverá retornar FALSE ao executar o método validar passando no parametro o valor diferente de ou', () => {
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