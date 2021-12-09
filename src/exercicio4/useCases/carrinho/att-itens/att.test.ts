import { AttItem } from "./att"


const makeSut = () => {
  return new AttItem()
}


describe('Testando a classe para atualizar os itens do carrinho', () => {
 
  test('Deverá somar a quantidade do produto já existente no carrinho', () => {
    const sut = makeSut()
    const usuario = {
      nome: 'any_nome',
      cep: 'any_cep'
    }
    const produto = {
      nome: 'any_produto',
      valor: 12
    }
    const item1 = {
      produto,
      quantidade: 10
    }

    const quantidadeEsperada = 20
    const itens = [item1]
    const carrinho = {
      usuario,
      itens
    }
    const result = sut.atualizaQuantidadeProduto({
      produto, quantidade: 10, carrinho, descricao: 'a'
    })
    expect(result[0].quantidade).toEqual(quantidadeEsperada)
  })

  test('Deverá subtrair a quantidade do produto já existente no carrinho', () => {
    const sut = makeSut()
    const usuario = {
      nome: 'any_nome',
      cep: 'any_cep'
    }
    const produto = {
      nome: 'any_produto',
      valor: 12
    }
    const item1 = {
      produto,
      quantidade: 10
    }
    const itens = [item1]
    const carrinho = {
      usuario,
      itens
    }
    const quantidadeEsperada = 5
    const result = sut.atualizaQuantidadeProduto({
      produto, quantidade: 5, carrinho, descricao: 'r'
    })
    expect(result[0].quantidade).toEqual(quantidadeEsperada)
  })


});