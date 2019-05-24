modulo0 = { name: 'modulo 0', dependencias: [] }
modulo1 = { name: 'modulo 1', dependencias: [] }
modulo2 = { name: 'modulo 2', dependencias: [modulo1] }
modulo3 = { name: 'modulo 3', dependencias: [modulo0] }
modulo4 = { name: 'modulo 4', dependencias: [] }
modulo5 = { name: 'modulo 5', dependencias: [modulo3] }
modulo6 = { name: 'modulo 6', dependencias: [modulo2, modulo5, modulo4] }
modulo7 = { name: 'modulo 7', dependencias: [modulo5, modulo6] }

iniciados = []
function inicia_modulo(modulo) {
  modulo.dependencias.map(mod => {
    inicia_modulo(mod)
  })
  if (!iniciados.includes(modulo.name)) {
    iniciados.push(modulo.name)
    console.log(modulo.name)
  }
}
inicia_modulo(modulo7)
