import { Validacoes } from "./validacoes";

 
const makeSut = () => {
  return new Validacoes()
}

describe('Teste da classe validações', () => {
  test('Deverá retornar true caso o valor passado como parâmetro seja considerado um número feliz', () => {
    const sut = makeSut()
    const result = sut.verificaFeliz(7)
    expect(result).toEqual(true)
  })

  test('Deverá retornar false caso o valor passado como parâmetro não seja considerado um número feliz', () => {
    const sut = makeSut()
    const result = sut.verificaFeliz(9)
    expect(result).toEqual(false)
  })

  test('Deverá retornar true caso o valor passado como parâmetro seja um número primo', () => {
    const sut = makeSut()
    const result = sut.verificaPrimo(7)
    expect(result).toEqual(true)
  })

  test('Deverá retornar false caso o valor passado como parâmetro não seja  um número primo', () => {
    const sut = makeSut()
    const result = sut.verificaPrimo(10)
    expect(result).toEqual(false)
  })


  test('Deverá retornar true caso o valor passado como parâmetro seja múltiplo de 3 OU 5', () => {
    const sut = makeSut()
    const result = sut.verificaMultiplo3Ou5(7)
    expect(result).toEqual(true)
  })

  test('Deverá retornar false caso o valor passado como parâmetro não seja  múltiplo de 3 OU 5', () => {
    const sut = makeSut()
    const result = sut.verificaMultiplo3Ou5(2)
    expect(result).toEqual(false)
  })

});