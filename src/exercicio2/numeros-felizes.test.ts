import { Utilitarios } from './utils/utils';
import { NumerosFelizes } from '.'

const makeSut = () => {
  const utilitariosStub = new Utilitarios()
  const sut = new NumerosFelizes(utilitariosStub)
  return {
    sut,
    utilitariosStub
  }
}

describe('Testando a classe NumerosFelizes', () => {

  test('Deverá retornar false caso o número não satisfaça a condição de número feliz', () => {
    const {sut} = makeSut()
    const result = sut.EFeliz(5)
    expect(result).toEqual(false)
  })

  test('Deverá retornar true caso o número satisfaça a condição de número feliz', () => {
    const {sut} = makeSut()
    const result = sut.EFeliz(7)
    expect(result).toEqual(true)
  })

  test.each([
    [5, false, 'não'],
    [7, true, ''],
    [11, false, 'não']
  ])(`O número %p deve retornar %p pois %s é um número feliz  `, (valorParametro, valorEsperado, descricao) => {
    const {sut} = makeSut()
    const result = sut.EFeliz(valorParametro)
    expect(result).toEqual(valorEsperado)
  })
  
  test('Deverá retornar erro ao passar como parâmetro um número menor que 0', () => {
    const {sut} = makeSut()
    expect(()=> {sut.EFeliz(0)}).toThrow('Parâmetro inválido')
  })

  test('Deverá retornar erro ao passar como parâmetro um valor decimal', () => {
    const {sut} = makeSut()
    expect(()=> {sut.EFeliz(1.5)}).toThrow('Parâmetro inválido')
  })

  test('Deverá garantir que a classe utilitario vai chamar o método somaDosQuadrados com o valor correto', async () => {
    const {sut, utilitariosStub} =  makeSut()
    const isValidSpy = jest.spyOn(utilitariosStub, 'somaDosQuadrados')
    sut.EFeliz(7)
    expect(isValidSpy).toHaveBeenCalledWith(7)
  })

  test('Deverá garantir que a classe utilitario vai chamar o método eDecimal com o valor correto', async () => {
    const {sut, utilitariosStub} =  makeSut()
    const isValidSpy = jest.spyOn(utilitariosStub, 'eDecimal')
    sut.EFeliz(7)
    expect(isValidSpy).toHaveBeenCalledWith(7)
  })

});