function obterUsuario(callback){
  setTimeout( function(){
    return callback( null, {
      id:1,
      nome: 'Aladin',
      dataNascimento: new Date()
    })
  }, 1000)
}
function obterTelefone(idUsuario, callback){
  setTimeout(() => {
    return callback(null, {
      telefone: '11223344',
      ddd: '81'
    })
  }, 2000);
}
function obterEndereco(idUsuario, callback){
  setTimeout(() => {
    return callback(null, {
      rua:'dos bobos',
      numero: 0
    })
  }, 2000);
}

function resolverUsuario(erro, usuario){
  console.log('usuario', usuario)
}

obterUsuario(function resolverUsuario(error, usuario){
  if(error){
    console.error('DEU RUIM em USUARIO', error)
    return;
  }
  obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
    if(error1){
      console.error('DEU RUIM em TELEFONE', error1)
      return;
    }

    obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
      if(error2){
        console.error('DEU RUIM em Endereço', error2)
        return;
      }
      console.log(`
      Nome: ${usuario.nome},
      Endereco: ${endereco.rua}, ${endereco.numero}
      Telefone: (${telefone.ddd})${telefone.telefone}`)
    })
  })
})
