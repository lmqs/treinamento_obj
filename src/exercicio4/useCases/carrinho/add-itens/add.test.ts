import { UtilsCarrinho } from "../../utils/utils-carrinho";
import { AttItem } from "../att-itens/att";
import { AddItem } from "./add";

const makeUtilsCarrinho = (): UtilsCarrinho => {
  return new UtilsCarrinho()
}
const makeAtualizaItem = (): AttItem => {
  return new AttItem()
}

const makeSut = () => {
  const utilsCarrinhoStub = makeUtilsCarrinho()
  const atualizaItemStub = makeAtualizaItem()
  const sut = new AddItem(utilsCarrinhoStub, atualizaItemStub )
  return {
    sut,
    atualizaItemStub,
    utilsCarrinhoStub
  }

}
describe('Testando a classe AddCarrinho', () => {
  test('Deverá adicionar um produto em um carrinho já existente', () => {
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
    
    const produtoParaAdicionar = {
      nome: 'any_produto2',
      valor: 12
    }
    const itemParaAdicionar = {
      produto: produtoParaAdicionar,
      quantidade: 2
    }

    const itemParaAdicionarArray = [itemParaAdicionar]

    const itensEsperado = [item1, itemParaAdicionar]
    const carrinhoEsperado = {
      usuario,
      itens: itensEsperado
    }
    const result = sut.addItens({
      itens: itemParaAdicionarArray, 
      usuario, 
      carrinho
    })
    expect(result).toEqual(carrinhoEsperado)
    
  })
  
  test('Deverá adicionar um produto em um carrinho vazio', () => {
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
    const carrinhoEsperado = {
      usuario,
      itens
    }

 
    const result = sut.addItens({itens, usuario})
    expect(result).toEqual(carrinhoEsperado)
    
  })

  test('Deverá adicionar um produto que já existe no carinho, ou seja, irá somar as quantidades', () => {
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

    const itemEsperado = {
      produto,
      quantidade: 20
    }
    const itensEsperado = [itemEsperado]

    const carrinhoEsperado = {
      usuario,
      itens:itensEsperado
    }
    const result = sut.addItens({itens, usuario, carrinho})
    expect(result).toEqual(carrinhoEsperado)
    
  })

  test('Deverá adicionar um lista de produtos em um carrinho já existente', () => {
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
    
    const produtoParaAdicionar1 = {
      nome: 'any_produto1',
      valor: 1.2
    }
    
    const produtoParaAdicionar2 = {
      nome: 'any_produto2',
      valor: 5.60
    }

    const itemParaAdicionar1 = {
      produto: produtoParaAdicionar1,
      quantidade: 34
    }
    
    const itemParaAdicionar2 = {
      produto: produtoParaAdicionar2,
      quantidade: 2
    }

    const itemParaAdicionarArray = [itemParaAdicionar1, itemParaAdicionar2]

    const itensEsperado = [item1, itemParaAdicionar1, itemParaAdicionar2]
    const carrinhoEsperado = {
      usuario,
      itens: itensEsperado
    }
    const result = sut.addItens({
      itens: itemParaAdicionarArray, 
      usuario, 
      carrinho
    })
    expect(result).toEqual(carrinhoEsperado)
  })

  test('Deverá adicionar um lista de produtos em um carrinho vazio', () => {
    const { sut } = makeSut()
    const usuario = {
      nome: 'any_nome',
      cep: 'any_cep'
    }
    const item1 = {
      produto: {
        nome: 'any_produto1',
        valor: 12
      },      
      quantidade: 10
    }

    const item2 = {
      produto: {
        nome: 'any_produto2',
        valor: 12
      },
      quantidade: 20
    }
    const itens = [item1, item2]
    const carrinhoEsperado = {
      usuario,
      itens
    }

    const result = sut.addItens({itens, usuario})
    expect(result).toEqual(carrinhoEsperado)
    
  })


  test('Deverá garantir que a classe AddItem irá chamar o método pesquisaPorProduto da classe UtilsCarrinho com os valores corretos', async () => {
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
    sut.addItens({itens, usuario, carrinho})
    expect(atualizaItemStubSpy).toHaveBeenCalledWith(produto, carrinho)
  })

});