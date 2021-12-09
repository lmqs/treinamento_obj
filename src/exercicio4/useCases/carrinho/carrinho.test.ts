import { UtilsCarrinho } from "../utils/utils-carrinho"
import { AddItem } from "./add-itens/add"
import { AttItem } from "./att-itens/att"
import { Carrinho } from "./carrinho"
import { RemoveItem } from "./remove-itens/remove"


const makeUtilsCarrinho = (): UtilsCarrinho => {
  return new UtilsCarrinho()
}

const makeAtualizaItem = (): AttItem => {
  return new AttItem()
}

const makeRemoveItem = (): RemoveItem => {
  return new RemoveItem(makeUtilsCarrinho(), makeAtualizaItem() )
}

const makeAddItem = (): AddItem => {
  return new AddItem(makeUtilsCarrinho(), makeAtualizaItem())
}

const makeSut = () => {
  const addStub = makeAddItem()
  const removeStub = makeRemoveItem()
  const sut = new Carrinho(addStub, removeStub)
  return {
    sut,
    addStub,
    removeStub
  }

}
describe('Testando a classe Carrinho', () => {
  test('Deverá retornar o valor total das compras do carrinho', () => {
    const { sut } = makeSut()
    const usuario = {
      nome: 'any_nome',
      cep: 'any_cep'
    }
    
    const produto = {
      nome: 'any_nome',
      valor: 12
    }

    const itemCarrinho = {
      produto,
      quantidade: 1
    }

    const itens = [itemCarrinho]
    const carrinho = {
      usuario,
      itens 
    }
    const result = sut.valorTotalCompras(carrinho)
    expect(result).toBe(12)
    
  })
  
  test('Deverá retornar o valor 0 se o carrinho estiver vazio', () => {
    const { sut } = makeSut()
    const usuario = {
      nome: 'any_nome',
      cep: 'any_cep'
    }
    const carrinho = {
      usuario,
      itens : []
    }
    const result = sut.valorTotalCompras(carrinho)
    expect(result).toBe(0)
    
  })

  test('Deverá retornar o valor do carrinho ao adicionar novo produto', () => {
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
    
    const produtoParaAdicionar = {
      nome: 'any_produto2',
      valor: 88
    }
    const itemParaAdicionar = {
      produto: produtoParaAdicionar,
      quantidade: 1
    }

    const itemParaAdicionarArray = [itemParaAdicionar]


    const result = sut.addItens({
      itens: itemParaAdicionarArray, 
      usuario, 
      carrinho
    })
    expect(result).toEqual(100)
    
  })

  test('Deverá garantir que a classe Carrinho irá chamar o método removerItem com os valores corretos', async () => {
    const {sut, removeStub} =  makeSut()
    const atualizaItemStubSpy = jest.spyOn(removeStub, 'removerItem')
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
    expect(atualizaItemStubSpy).toHaveBeenCalledWith({produto, carrinho, quantidade: 1})
  })

  test('Deverá garantir que a classe Carrinho irá chamar o método addItens com os valores corretos', async () => {
    const {sut, addStub} =  makeSut()
    const atualizaItemStubSpy = jest.spyOn(addStub, 'addItens')
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
    sut.addItens({itens, usuario, carrinho})
    expect(atualizaItemStubSpy).toHaveBeenCalledWith({itens, usuario, carrinho})
  })
});