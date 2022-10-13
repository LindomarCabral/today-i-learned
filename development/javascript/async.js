
//importamos um módulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
  //Quando de algum problema -> reject(ERRO)
  //Quando sucess -> RESOLV
  return new Promise( function resolvePromise(resolve,reject) {
    setTimeout( function () {
      //return reject(new Error('DEU RUIN TESTE!!'))
      return resolve({
        id:1,
        nome: 'Aladin',
        dataNascimento: new Date()
      })
    }, 1000)
  })

}
function obterTelefone(idUsuario){
  return new Promise(function resolvePromise(resolve, reject){
    setTimeout(() => {
      return resolve({
        telefone: '11223344',
        ddd: '81'
      })
    }, 2000);
  })
}
function obterEndereco(idUsuario, callback){
  setTimeout(() => {
    return callback(null, {
      rua:'dos bobos',
      numero: 0
    })
  }, 2000);
}

// 1° passo selecionar a palavra async -a. automaticamente ela retorna uma Promise

main()
async function main(){
  try {
    console.time('medida-promise')
    const usuario = await obterUsuario()
    //const telefone = await obterTelefone(usuario.id)
   // const endereco = await obterEnderecoAsync(usuario.id)

    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id)
    ])
    const telefone = resultado[0]
    const endereco = resultado[1]

    console.log(`
    Nome: ${usuario.nome}
    Endereco: ${endereco.rua}, ${endereco.numero}
    Telefone: (${telefone.ddd}) ${telefone.telefone}
    `)
    console.timeEnd('medida-promise')
  } catch (error) {
    console.error('DEU RUIM', error)
  }
}


