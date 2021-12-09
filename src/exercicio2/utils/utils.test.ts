import { Utilitarios } from "./utils";

describe('Testando a classe Utilitarios', () => {
  const makeSut = () => {
    return new Utilitarios()
  }
  
  test('Deverá retornar true caso o número seja decimal', () => {
    const sut = makeSut()
    const result = sut.eDecimal(7.5)
    expect(result).toEqual(true)
  })

  test('Deverá retornar false caso o número seja inteiro', () => {
    const sut = makeSut()
    const result = sut.eDecimal(7)
    expect(result).toEqual(false)
  })

  test('Deverá retornar o valor da soma ao quadrado do parâmetro passado', () => {
    const sut = makeSut()
    const result = sut.somaDosQuadrados(7)
    expect(result).toEqual(49)
  })

  test.each([
    [7, 49],
    [49, 97],
    [97, 130],
    [130, 10]
  ])("Deverá retornar de acordo com o parâmetro passado %p a soma ao quadrado de cada dígito %p ", (valorParametro, valorEsperado) => {
    const sut = makeSut()
    const result = sut.somaDosQuadrados(valorParametro)
    expect(result).toEqual(valorEsperado)
  })

  test.each([
    [true, 7, [10 , 20, 7]],
    [true, 49, [97, 1, 49]],
    [false, 10, [1, 0, 2]],
    [true, 0, [1, 0, 2]],
    [false, 6, [7, 7, 7]]
  ])("Deverá retornar %p caso o número %p esteja contido no array %p ", (valorEsperado, valorParametro, arrayParametro) => {
    const sut = makeSut()
    const result = sut.containArray(valorParametro, arrayParametro )
    expect(result).toEqual(valorEsperado)
  })


});