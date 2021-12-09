import { UtilsCarrinho } from "../../utils/utils-carrinho";
import { AttItem } from "../att-itens/att";
import { RemoveItem } from "./remove";

const makeUtilsCarrinho = (): UtilsCarrinho => {
  return new UtilsCarrinho()
}
const makeAtualizaItem = (): AttItem => {
  return new AttItem()
}

const makeSut = () => {
  const utilsCarrinhoStub = makeUtilsCarrinho()
  const atualizaItemStub = makeAtualizaItem()
  const sut = new RemoveItem(utilsCarrinhoStub, atualizaItemStub)
  return {
    sut,
    utilsCarrinhoStub,
    atualizaItemStub
  }

}
describe('Testando a classe Remove Itens do carrinho', () => {
  test('Deverá remover um produto do carrinho', () => {
    const { sut } = makeSut()
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
      quantidade: 1
    }

    const item2 = {
      produto : {
        nome: 'any_produto2',
        valor: 12
      },
      quantidade: 10
    }

    const itens = [item1, item2]
    const carrinho = {
      usuario,
      itens
    }
    const carrinhoEsperado = {
      usuario,
      itens: [item2]
    }
    const result = sut.removerItem({produto, carrinho, quantidade: 1})
    expect(result).toEqual(carrinhoEsperado)
  })

  test('Deverá remover o único produto do carrinho', () => {
    const { sut } = makeSut()
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
      quantidade: 1
    }
    const itens = [item1]
    const carrinho = {
      usuario,
      itens
    }
    const carrinhoEsperado = {
      usuario,
      itens: []
    }
    const result = sut.removerItem({produto, carrinho, quantidade:1})
    expect(result).toEqual(carrinhoEsperado)
  })

  test('Deverá subtrair a quantidade quando o produto a ser excluido já estiver no carrinho', () => {
    const { sut } = makeSut()
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

    const carrinhoEsperado = {
      usuario,
      itens: [{produto, quantidade: 9}]
    }
    const quantidadeASerReduzida = 1
    const result = sut.removerItem({produto, carrinho, quantidade: quantidadeASerReduzida})
    expect(result).toEqual(carrinhoEsperado)
  })

  

  test('Deverá garantir que a classe UtilsCarrinho irá chamar o método pesquisaPorProduto com os valores corretos', async () => {
    const {sut, utilsCarrinhoStub} =  makeSut()
    const atualizaItemStubSpy = jest.spyOn(utilsCarrinhoStub, 'pesquisaPorProduto')
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
      quantidade: 0
    }
    const itens = [item1]
    const carrinho = {
      usuario,
      itens
    }
    sut.removerItem({produto,carrinho, quantidade: 1})
    expect(atualizaItemStubSpy).toHaveBeenCalledWith(produto, carrinho)
  })

});