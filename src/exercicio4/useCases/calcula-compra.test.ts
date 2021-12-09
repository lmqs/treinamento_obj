import { IFrete } from "../protocolos/ifrete";
import { CalculaCompra } from "./calcula-compra";
import { AddItem } from "./carrinho/add-itens/add";
import { AttItem } from "./carrinho/att-itens/att";
import { Carrinho } from "./carrinho/carrinho";
import { RemoveItem } from "./carrinho/remove-itens/remove";
import { UtilsCarrinho } from "./utils/utils-carrinho";

const makeCarrinho = (): Carrinho => {
  return new Carrinho(
      new AddItem(new UtilsCarrinho(), new AttItem()), 
      new RemoveItem(new UtilsCarrinho(), new AttItem())
      )
}

const makeCorreios = (): IFrete => {
  class CorreiosStub implements IFrete {
    pesquisaPorCEP(cep: string): number {
      return 0
    }
  }
  return new CorreiosStub()
}

interface SutTypes {
  sut: CalculaCompra
  correiosStub: IFrete
}

const makeSut = (): SutTypes => {
  const correiosStub = makeCorreios()
  const carrinhoStub = makeCarrinho()
  const sut = new CalculaCompra(correiosStub, carrinhoStub)
  return { 
    sut, correiosStub
  }
}

describe('Teste da classe Calcula Compra', () => {
  test('Deverá retornar erro se o CEP do usuário estiver em branco ', () => {
    const { sut } = makeSut()
    const usuario = {
      nome: 'any_nome',
      cep: ''
    }
    
    const produto = {
      nome: 'any_nome',
      valor: 12
    }

    const itemCarrinho = {
      produto,
      quantidade: 10
    }

    const itens = [itemCarrinho]
    const carrinho = {
      usuario,
      itens 
    }
    expect(()=> {sut.soma(carrinho)}).toThrow('Campo obrigatório')
  })

  test('Deverá retornar erro se o Nome do usuário estiver em branco ', () => {
    const { sut } = makeSut()
    const usuario = {
      nome: '',
      cep: 'any_cep'
    }
    
    const produto = {
      nome: 'any_nome',
      valor: 12
    }

    const itemCarrinho = {
      produto,
      quantidade: 10
    }

    const itens = [itemCarrinho]
    const carrinho = {
      usuario,
      itens 
    }
    expect(()=> {sut.soma(carrinho)}).toThrow('Campo obrigatório')
  })

  test('Deverá retornar o valor total do carrinho', () => {
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
      quantidade: 10
    }

    const itens = [itemCarrinho]
    const carrinho = {
      usuario,
      itens 
    }
    const result = sut.soma(carrinho)
    expect(result).toBe(120)
  })

  test('Deverá garantir que o método pesquisaPorCEP da classe Correios vai ser chamado com o cep correto', async () => {
    const { sut, correiosStub } = makeSut()
    const valorSpy = jest.spyOn(correiosStub, 'pesquisaPorCEP')
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
      quantidade: 3
    }

    const itens = [itemCarrinho]
    const carrinho = {
      usuario,
      itens 
    }
    sut.soma(carrinho)
    expect(valorSpy).toHaveBeenCalledWith('any_cep')
  })

  test('Deverá retornar erro 500 se o método pesquisaPorCEP da classe Correios gerar alguma exceção', async () => {
    const { sut, correiosStub } = makeSut()
    jest.spyOn(correiosStub, 'pesquisaPorCEP').mockImplementationOnce(() => {
      throw new Error('500')
    })
    const usuario = {
      nome: 'any_nome',
      cep: 'any_cep'
    }
    
    const produto = {
      nome: 'any_nome',
      valor: 8
    }

    const itemCarrinho = {
      produto,
      quantidade: 10
    }

    const itens = [itemCarrinho]
    const carrinho = {
      usuario,
      itens 
    }
    expect(()=> {sut.soma(carrinho)}).toThrow('500')
  })

  test('Deverá garantir que o método pesquisaPorCEP só será chamada uma vez', () => {
    const { sut, correiosStub } = makeSut()
    const usuario = {
      nome: 'any_nome',
      cep: 'any_cep'
    }
    
    const produto = {
      nome: 'any_nome',
      valor: 10
    }

    const itemCarrinho = {
      produto,
      quantidade: 9
    }

    const itens = [itemCarrinho]
    const carrinho = {
      usuario,
      itens 
    }
    const valorSpy = jest.spyOn(correiosStub, 'pesquisaPorCEP')
    sut.soma(carrinho)
    expect(valorSpy.mock.calls.length).toBe(1)
  })


  test('Deverá garantir que o método pesquisaPorCEP NÃO será chamada quando valor total do carrinho for maior ou igual a 100', () => {
    const { sut, correiosStub } = makeSut()
    const usuario = {
      nome: 'any_nome',
      cep: 'any_cep'
    }
    
    const produto = {
      nome: 'any_nome',
      valor: 100
    }

    const itemCarrinho = {
      produto,
      quantidade: 10
    }

    const itens = [itemCarrinho]
    const carrinho = {
      usuario,
      itens 
    }
    const valorSpy = jest.spyOn(correiosStub, 'pesquisaPorCEP')
    sut.soma(carrinho)
    expect(valorSpy.mock.calls.length).toBe(0)
  })


});

