function obterMensagens() {
    var retorno = [];
  
    $.ajax({
      url: 'https://app-uniesp-p2-b8d2992ac568.herokuapp.com/mensagens',
      method: 'GET',
      dataType: 'json',
      async: true
    }).done(function(data) {
      retorno = data;
    }).fail(function(erro) {
      console.error("Erro ao obter mensagens:", erro);
    });
  
    return retorno;
  }
  
  function inserirMensagem(mensagem) {
    console.log("Enviando mensagem:", mensagem); // Adicionado para depuração
    $.ajax({
      url: 'https://app-uniesp-p2-b8d2992ac568.herokuapp.com/mensagens',
      method: 'POST',
      data: JSON.stringify(mensagem),
      async: true,
      contentType: 'application/json',
      dataType: 'text', // Alterado para 'text' para evitar parsererror
    }).done(function(data) {
      console.log("Mensagem inserida com sucesso!", data);
    }).fail(function(erro) {
      console.error("Erro ao inserir mensagem:", erro);
      console.log("Erro detalhes:", erro.responseText); // Adicionado para depuração
    });
  }
  
  function validarUsuario(objLoginSenha) {
    $.ajax({
      url: 'https://app-uniesp-p2-b8d2992ac568.herokuapp.com/usuarios/validar',
      method: 'POST',
      dataType: 'json',
      async: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      contentType: 'application/json',
      data: JSON.stringify(objLoginSenha)
    }).done(function(data) {
      retorno = data;
    }).fail(function(erro) {
      console.error("Erro ao validar usuário:", erro);
    });
  
    return retorno;
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('send-button').addEventListener('click', function(event) {
      event.preventDefault();
  
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const mensagem = document.getElementById('msg').value;
  
      if (nome && email && mensagem) {
        inserirMensagem({ nome, email, mensagem });
      } else {
        alert('Por favor, preencha todos os campos.');
      }
    });
  });
  