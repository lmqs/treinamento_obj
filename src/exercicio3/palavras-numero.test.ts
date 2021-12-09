import { PalavrasEmNumero } from ".";
import { Validacoes } from "./utils/validacoes";

const makeSut = () => {
  const validacoesStub = new Validacoes()
  const sut = new PalavrasEmNumero(validacoesStub)
  return {
    sut,
    validacoesStub
  }
}

describe('Teste da classe Palavras em número', () => {

  test.each([
    ['abc',  6, false,  false, true],
    ['aA',  28, false,  true, true],
    ['aZ',  53, true,  false, true],
    ['a',  1, false,  true, false]
  ])("As letras %p representam o valor %p, é primo = %p, é feliz = %p, é múltiplo de 3 ou 5 = %p ", (letras, letrasEmNumero,  primo, feliz, multiplo) => {
    const {sut} = makeSut()
    const resultadoEmNumero = sut.transformeLetrasEmNumero(letras)
    const ePrimo = sut.verificaPrimo(resultadoEmNumero)
    const eFeliz = sut.verificaFeliz(resultadoEmNumero)
    const eMultiplo = sut.verificaMultiplo3Ou5(resultadoEmNumero)
    expect(resultadoEmNumero).toEqual(letrasEmNumero)
    expect(ePrimo).toEqual(primo)
    expect(eFeliz).toEqual(feliz)
    expect(eMultiplo).toEqual(multiplo)
  })

  test('Deverá garantir que a classe Validacoes vai chamar o método verificaPrimo com o valor correto', async () => {
    const {sut, validacoesStub} =  makeSut()
    const isValidSpy = jest.spyOn(validacoesStub, 'verificaPrimo')
    sut.verificaPrimo(7)
    expect(isValidSpy).toHaveBeenCalledWith(7)
  })

  test('Deverá garantir que a classe Validacoes vai chamar o método verificaFeliz com o valor correto', async () => {
    const {sut, validacoesStub} =  makeSut()
    const isValidSpy = jest.spyOn(validacoesStub, 'verificaFeliz')
    sut.verificaFeliz(7)
    expect(isValidSpy).toHaveBeenCalledWith(7)
  })

  test('Deverá garantir que a classe Validacoes vai chamar o método verificaMultiplo3Ou5 com o valor correto', async () => {
    const {sut, validacoesStub} =  makeSut()
    const isValidSpy = jest.spyOn(validacoesStub, 'verificaMultiplo3Ou5')
    sut.verificaMultiplo3Ou5(7)
    expect(isValidSpy).toHaveBeenCalledWith(7)
  })

});