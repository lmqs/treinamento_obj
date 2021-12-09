import { Multiplos } from ".";


const makeSut = () => {
  return new Multiplos()
}

describe('Teste da classe Multiplos', () => {
  
  test.each([
    ['ou',  10, 33],
    ['e',   100, 315],
    ['oue', 1000, 33173]
  ])("Deverá retornar a soma de todos os números múltiplos de 3 %p 5 de números naturais abaixo de %p", (descricao, valorParametro,  valorEsperado) => {
    const sut = makeSut()
    const result = sut.soma(valorParametro, descricao)
    expect(result).toEqual(valorEsperado)
  })
  
  test('Deverá garantir que a função soma vai ser chamado com os parâmetros corretos', () => {
    const sut = makeSut()
    const resultSpy = jest.spyOn(sut, 'soma')
    sut.soma(20, 'e')
    expect(resultSpy).toHaveBeenCalledWith(20, 'e')
  })

  test('Deverá retornar erro caso o parâmetro "descricao" seja diferente dos valores esperados (e, ou, oue)', () => {
    const sut = makeSut()
    expect(()=> {sut.soma(20,'')}).toThrow('Parâmetro inválido')
  })

  test('Deverá retornar erro caso o parâmetro "valorLimite" seja menor ou igual a 0', () => {
    const sut = makeSut()
    expect(()=> {sut.soma(0, 'e')}).toThrow('Parâmetro inválido')
  })

});