grafo = {
  '0': { '1': 2, '4': 3 },
  '1': { '0': 2, '3': 8, '5': 9, '6': 6 },
  '2': { '5': 3, '6': 7 },
  '3': { '1': 8, '7': 6 },
  '4': { '0': 3, '6': 5, '7': 9 },
  '5': { '1': 9, '2': 3, '6': 4, '7': 5 },
  '6': { '1': 6, '2': 7, '4': 5, '5': 4 },
  '7': { '3': 6, '4': 9, '5': 5 }
}

function menorCusto(custos, verificados) {
  return Object.keys(custos).reduce((menor, no) => {
    if (menor === null || custos[no] < custos[menor]) {
      if (!verificados.includes(no)) {
        menor = no
      }
    }
    return menor
  }, null)
}

function geraCaminho(final, noOrigem) {
  let caminhoFinal = [final]
  let org = noOrigem[final]
  while (org) {
    caminhoFinal.push(org)
    org = noOrigem[org]
  }
  caminhoFinal.reverse()
  return caminhoFinal
}

function checaCaminho(custo, grafo, origem, noOrigem) {
  const verificados = []
  let menor = menorCusto(custo, verificados)
  while (menor) {
    let custo_atual = custo[menor]
    let ligados = grafo[menor]
    for (let proximo in ligados) {
      if (proximo !== origem) {
        let soma = custo_atual + ligados[proximo]
        if (!custo[proximo] || custo[proximo] > soma) {
          custo[proximo] = soma
          noOrigem[proximo] = menor
        }
      }
    }
    verificados.push(menor)
    menor = menorCusto(custo, verificados)
  }
}

const menorCaminho = (grafo, origem, final) => {
  let custo = Object.assign({}, grafo[origem])

  const noOrigem = {}
  for (let ligacao in grafo[origem]) {
    noOrigem[ligacao] = origem
  }

  checaCaminho(custo, grafo, origem, noOrigem)

  let caminhoFinal = geraCaminho(final, noOrigem)

  return `${final},${custo[final]},${caminhoFinal.join('-')}`
}

console.log('Vertex,Cost,Path')
console.log(menorCaminho(grafo, '0', '1'))
console.log(menorCaminho(grafo, '0', '2'))
console.log(menorCaminho(grafo, '0', '3'))
console.log(menorCaminho(grafo, '0', '4'))
console.log(menorCaminho(grafo, '0', '5'))
console.log(menorCaminho(grafo, '0', '6'))
console.log(menorCaminho(grafo, '0', '7'))
